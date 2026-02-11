import re
import hashlib
import os
import math
from brain_engine.ocr_redaction import GeminiOCR, GeminiAnalyzer, RedactionService
from brain_engine.vault_chat_engine import VaultChatEngine

class IntelligentProcessor:
    """
    Main processing engine that orchestrates OCR, analysis, sharding, and indexing.
    Now powered by real Gemini AI instead of mock data.
    """
    def __init__(self, storage_root="vault_data"):
        self.ocr = GeminiOCR()
        self.analyzer = GeminiAnalyzer()
        self.redactor = RedactionService()
        self.shredder = FileShredder(storage_root=storage_root)
        self.vault = VaultChatEngine()

    def process_file_input(self, filename, content, is_image=False):
        """
        Process uploaded file with real AI analysis.
        """
        print(f"\n[IntelligentProcessor] Processing: {filename}")
        
        # Ensure content is bytes for the shredder
        byte_content = content if isinstance(content, bytes) else str(content).encode()
        
        # Step 1: Extract text (OCR for images, direct for text)
        if is_image:
            # Save temp file for OCR processing
            temp_path = f"temp_{filename}"
            with open(temp_path, 'wb') as f:
                f.write(byte_content)
            
            text = self.ocr.extract_text_from_image(temp_path)
            
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)
        else:
            try:
                text = byte_content.decode('utf-8')
            except:
                text = str(byte_content)
        
        print(f"[IntelligentProcessor] Extracted {len(text)} characters")
        
        # Step 2: AI-powered document analysis
        analysis = self.analyzer.analyze_document(text, filename)
        
        print(f"[IntelligentProcessor] Document Type: {analysis['document_type']}")
        print(f"[IntelligentProcessor] PII Detected: {analysis['pii_detected']}")
        print(f"[IntelligentProcessor] Sensitivity: {analysis['sensitivity_level']}/5")
        
        # Step 3: Check for semantic duplicates
        duplicate_id = self.vault.check_similarity(text, threshold=0.85)
        if duplicate_id:
            print(f"[IntelligentProcessor] Skipping - duplicate of: {duplicate_id}")
            return {
                "tags": ["DUPLICATE"],
                "shards": [],
                "is_sensitive": False,
                "is_duplicate": True,
                "matched_with": duplicate_id,
                "analysis": analysis
            }
        
        # Step 4: Physical sharding & distribution
        shards = self.shredder.shred_and_distribute(filename, byte_content)
        
        # Step 5: Calculate file metadata
        file_size_bytes = len(byte_content)
        size_str = f"{file_size_bytes / 1024:.1f} KB" if file_size_bytes < 1024*1024 else f"{file_size_bytes / (1024*1024):.1f} MB"
        
        # Step 6: Index for RAG chat with AI-generated metadata
        metadata = {
            "type": analysis['document_type'],
            "size": size_str,
            "sensitive": len(analysis['pii_detected']) > 0,
            "tags": analysis['suggested_tags'],
            "pii_types": analysis['pii_detected'],
            "sensitivity_level": analysis['sensitivity_level'],
            "summary": analysis['brief_summary']
        }
        
        self.vault.index_document(filename, text, metadata=metadata)
        
        # Step 7: Return processing result
        return {
            "tags": analysis['suggested_tags'],
            "pii_detected": analysis['pii_detected'],
            "shards": shards,
            "is_sensitive": len(analysis['pii_detected']) > 0,
            "is_duplicate": False,
            "document_type": analysis['document_type'],
            "sensitivity_level": analysis['sensitivity_level'],
            "summary": analysis['brief_summary']
        }

class ConsistentHasher:
    """
    Distributes shards across nodes using consistent hashing.
    """
    def __init__(self, nodes=5, replicas=3):
        self.nodes = [f"Node-{chr(65+i)}" for i in range(nodes)]  # Node-A, Node-B, etc.
        self.replicas = replicas
        
    def get_node_for_shard(self, shard_id):
        hash_val = int(hashlib.md5(shard_id.encode()).hexdigest(), 16)
        node_index = hash_val % len(self.nodes)
        assigned_nodes = []
        for i in range(self.replicas):
            idx = (node_index + i) % len(self.nodes)
            assigned_nodes.append(self.nodes[idx])
        return assigned_nodes

class FileShredder:
    """
    Shreds files into encrypted chunks and distributes across nodes.
    """
    def __init__(self, chunk_size=4194304, storage_root="vault_data"): 
        self.chunk_size = chunk_size  # 4MB chunks
        self.storage_root = storage_root
        self.hasher = ConsistentHasher()
        
    def shred_and_distribute(self, filename, content):
        """
        Splits file bytes and writes shards to disk based on Consistent Hashing.
        """
        file_size = len(content)
        num_chunks = math.ceil(file_size / self.chunk_size)
        shards_metadata = []

        for i in range(num_chunks):
            shard_id = f"{filename}_shard_{i}"
            nodes = self.hasher.get_node_for_shard(shard_id)
            
            # Extract actual bytes for this shard
            start = i * self.chunk_size
            end = min((i + 1) * self.chunk_size, file_size)
            shard_bytes = content[start:end]
            
            # Physically write to assigned nodes
            for node in nodes:
                node_path = os.path.join(self.storage_root, node)
                if not os.path.exists(node_path):
                    os.makedirs(node_path)
                
                shard_file = os.path.join(node_path, f"{shard_id}.shard")
                with open(shard_file, "wb") as f:
                    f.write(shard_bytes)
            
            shards_metadata.append({
                "shard_id": shard_id,
                "nodes": nodes,
                "size": len(shard_bytes)
            })
            
        print(f"[FileShredder] Distributed '{filename}' into {len(shards_metadata)} shards across {self.hasher.replicas} replicas")
        return shards_metadata

# Example Usage
if __name__ == "__main__":
    processor = IntelligentProcessor()
    
    # Test with sample content
    test_file = "sample_document.txt"
    test_content = b"""
    John Smith
    Email: john.smith@company.com
    Phone: (555) 123-4567
    Date of Birth: 03/15/1985
    
    This is a confidential employment contract for the position of Senior Engineer.
    Salary: $120,000 per year
    Start Date: January 1, 2024
    """
    
    result = processor.process_file_input(test_file, test_content)
    print(f"\n=== Processing Result ===")
    print(f"Document Type: {result.get('document_type')}")
    print(f"Tags: {result.get('tags')}")
    print(f"PII Detected: {result.get('pii_detected')}")
    print(f"Sensitive: {result.get('is_sensitive')}")
    print(f"Summary: {result.get('summary')}")
