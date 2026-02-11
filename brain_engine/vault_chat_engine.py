import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class VaultChatEngine:
    """
    RAG-powered chat engine using Gemini for intelligent document querying.
    """
    def __init__(self, storage_path="brain_engine/vault_storage"):
        self.storage_path = storage_path
        self.db_file = os.path.join(storage_path, "index.json")
        self.vector_db_path = os.path.join(storage_path, "vector_data")
        
        # Ensure storage directory exists
        if not os.path.exists(self.storage_path):
            os.makedirs(self.storage_path)
        if not os.path.exists(self.vector_db_path):
            os.makedirs(self.vector_db_path)
        
        # Initialize Gemini
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env file")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Load indexed documents
        self.indexed_docs = self._load_from_disk()
        
    def _load_from_disk(self):
        if os.path.exists(self.db_file):
            try:
                with open(self.db_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    print(f"[VaultStore] Restored {len(data)} documents from persistence.")
                    return data
            except Exception as e:
                print(f"[VaultStore] Error loading storage: {e}")
        return []

    def _save_to_disk(self):
        try:
            with open(self.db_file, 'w', encoding='utf-8') as f:
                json.dump(self.indexed_docs, f, indent=4, ensure_ascii=False)
        except Exception as e:
            print(f"[VaultStore] Error saving to storage: {e}")

    def get_all_docs(self):
        return self.indexed_docs
    
    def get_document(self, file_id):
        """
        Get a specific document by ID.
        """
        for doc in self.indexed_docs:
            if doc["id"] == file_id:
                return doc
        return None
    
    def delete_document(self, file_id):
        """
        Delete a document from the index.
        """
        self.indexed_docs = [doc for doc in self.indexed_docs if doc["id"] != file_id]
        self._save_to_disk()
        print(f"[VaultChat] Deleted document: {file_id}")
    
    def update_metadata(self, file_id, metadata):
        """
        Update metadata for a specific document.
        """
        for doc in self.indexed_docs:
            if doc["id"] == file_id:
                doc["metadata"] = metadata
                self._save_to_disk()
                print(f"[VaultChat] Updated metadata for: {file_id}")
                return True
        return False

    def index_document(self, file_id, text, metadata=None):
        """
        Index a document with its content and metadata.
        """
        print(f"[VaultChat] Indexing document {file_id}...")
        
        # Create document entry
        doc_entry = {
            "id": file_id, 
            "content": text[:5000],  # Store first 5000 chars for search
            "full_content": text,  # Store full content
            "metadata": metadata or {},
            "timestamp": str(os.path.getmtime(self.db_file) if os.path.exists(self.db_file) else 0)
        }
        
        # Check if document already exists
        existing_idx = next((i for i, doc in enumerate(self.indexed_docs) if doc["id"] == file_id), None)
        
        if existing_idx is not None:
            self.indexed_docs[existing_idx] = doc_entry
            print(f"[VaultChat] Updated existing document: {file_id}")
        else:
            self.indexed_docs.append(doc_entry)
            print(f"[VaultChat] Added new document: {file_id}")
        
        self._save_to_disk()

    def check_similarity(self, new_text, threshold=0.85):
        """
        Check if similar document exists using Gemini for semantic comparison.
        """
        if not self.indexed_docs:
            return None
        
        try:
            # Use Gemini to check semantic similarity
            docs_summary = "\n\n".join([f"ID: {doc['id']}\nContent: {doc['content'][:500]}" for doc in self.indexed_docs[:5]])
            
            prompt = f"""Compare this new document with existing documents and determine if it's a duplicate or very similar (>85% similar).

New document:
{new_text[:1000]}

Existing documents:
{docs_summary}

If you find a very similar document (>85% semantic similarity), respond with ONLY the document ID.
If no similar document exists, respond with "NONE".
Response:"""

            response = self.model.generate_content(prompt)
            result = response.text.strip()
            
            if result != "NONE" and result in [doc["id"] for doc in self.indexed_docs]:
                print(f"[VaultChat] Semantic duplicate detected: {result}")
                return result
                
        except Exception as e:
            print(f"[VaultChat] Similarity check error: {e}")
        
        return None

    def query_vault(self, query):
        """
        Query the vault using RAG (Retrieval Augmented Generation) with Gemini.
        """
        print(f"[VaultChat] Processing query: '{query}'")
        
        if not self.indexed_docs:
            return {
                "answer": "Your vault is empty. Upload some documents first to start querying!",
                "sources": []
            }
        
        try:
            # Retrieve relevant documents
            relevant_docs = []
            for doc in self.indexed_docs:
                # Simple keyword matching for initial filtering
                if any(word.lower() in doc["content"].lower() for word in query.split()):
                    relevant_docs.append(doc)
            
            # If no keyword matches, use all docs (let Gemini decide relevance)
            if not relevant_docs:
                relevant_docs = self.indexed_docs[:3]  # Limit to 3 most recent
            
            # Build context from relevant documents
            context = "\n\n---\n\n".join([
                f"Document: {doc['id']}\nType: {doc['metadata'].get('type', 'Unknown')}\nContent:\n{doc['content'][:1500]}"
                for doc in relevant_docs[:3]  # Limit to top 3 for token efficiency
            ])
            
            # Generate answer using Gemini with RAG
            prompt = f"""You are an intelligent document assistant with access to a user's private vault.

User Query: {query}

Available Documents:
{context}

Instructions:
1. Answer the user's query based ONLY on the information in the provided documents
2. If the answer is not in the documents, say "I couldn't find that information in your vault"
3. Be specific and cite which document(s) you're referencing
4. Keep your response concise but informative

Answer:"""

            response = self.model.generate_content(prompt)
            answer = response.text.strip()
            
            source_files = [doc["id"] for doc in relevant_docs]
            
            return {
                "answer": answer,
                "sources": source_files[:3]
            }
            
        except Exception as e:
            print(f"[VaultChat] Query error: {e}")
            return {
                "answer": f"Error processing query: {str(e)}. Please try again.",
                "sources": []
            }

# Example Usage
if __name__ == "__main__":
    chat = VaultChatEngine()
    
    # Test indexing
    chat.index_document(
        "test_doc.txt",
        "This is a test document about Python programming and machine learning.",
        metadata={"type": "Text", "size": "1.2 KB"}
    )
    
    # Test querying
    result = chat.query_vault("What is this document about?")
    print(f"\nAI Response: {result['answer']}")
    print(f"Sources: {result['sources']}")
