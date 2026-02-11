from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from brain_engine.intelligent_worker import IntelligentProcessor
from brain_engine.vault_chat_engine import VaultChatEngine
import uvicorn
import os

app = FastAPI(title="STORE IT! Gateway API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = IntelligentProcessor()

@app.get("/")
async def root():
    return {"status": "online", "message": "Cognitive File Gateway is Active"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Entry point for real file uploads with AI-powered analysis.
    """
    content = await file.read()
    filename = file.filename
    is_image = filename.lower().endswith(('.png', '.jpg', '.jpeg', '.pdf')) 
    
    # Process through the Intelligent Engine with real AI
    result = processor.process_file_input(filename, content, is_image=is_image)
    
    return {
        "success": True,
        "filename": filename,
        "intelligence": {
            "document_type": result.get("document_type", "Unknown"),
            "tags": result.get("tags", []),
            "pii_detected": result.get("pii_detected", []),
            "is_sensitive": result.get("is_sensitive", False),
            "is_duplicate": result.get("is_duplicate", False),
            "sensitivity_level": result.get("sensitivity_level", 1),
            "summary": result.get("summary", "No summary available"),
            "matched_with": result.get("matched_with", None)
        },
        "distribution": {
            "shard_count": len(result.get("shards", [])),
            "replication_factor": 3,
            "nodes": list(set([node for shard in result.get("shards", []) for node in shard["nodes"]])) if result.get("shards") else []
        }
    }

@app.get("/files")
async def list_files():
    """
    Returns all indexed files from the vault with AI-generated metadata.
    """
    docs = processor.vault.get_all_docs()
    files = []
    for doc in docs:
        metadata = doc.get("metadata", {})
        files.append({
            "id": doc["id"],
            "name": doc["id"],
            "type": metadata.get("type", "Document"),
            "size": metadata.get("size", "Unknown"),
            "updated": "Live",
            "tags": metadata.get("tags", []),
            "sensitive": metadata.get("sensitive", False),
            "pii_types": metadata.get("pii_types", []),
            "sensitivity_level": metadata.get("sensitivity_level", 1),
            "summary": metadata.get("summary", "No summary available")
        })
    return files

@app.post("/chat")
async def chat_with_vault(data: dict):
    """
    Ask questions about your uploaded documents.
    """
    query = data.get("query", "")
    if not query:
        return {"answer": "I need a query to help you find something."}
        
    response = processor.vault.query_vault(query)
    return response

@app.delete("/delete/{file_id}")
async def delete_file(file_id: str):
    """
    Delete a file from the vault and remove all its shards.
    """
    try:
        # Remove from vault index
        processor.vault.delete_document(file_id)
        
        # Remove physical shards
        import shutil
        for node_dir in os.listdir("vault_data"):
            node_path = os.path.join("vault_data", node_dir)
            if os.path.isdir(node_path):
                # Find and delete all shards for this file
                for shard_file in os.listdir(node_path):
                    if shard_file.startswith(file_id):
                        shard_path = os.path.join(node_path, shard_file)
                        os.remove(shard_path)
                        print(f"[Gateway] Deleted shard: {shard_path}")
        
        print(f"[Gateway] Successfully deleted file: {file_id}")
        return {"success": True, "message": f"File {file_id} deleted successfully"}
    except Exception as e:
        print(f"[Gateway] Delete error: {e}")
        return {"success": False, "message": str(e)}

@app.post("/rescan/{file_id}")
async def rescan_file(file_id: str):
    """
    Re-analyze a file with Gemini AI to update its metadata.
    """
    try:
        # Get the document from vault
        doc = processor.vault.get_document(file_id)
        if not doc:
            return {"success": False, "message": "File not found"}
        
        # Re-analyze with Gemini
        text = doc.get("full_content", doc.get("content", ""))
        analysis = processor.analyzer.analyze_document(text, file_id)
        
        # Update metadata
        metadata = {
            "type": analysis['document_type'],
            "size": doc.get("metadata", {}).get("size", "Unknown"),
            "sensitive": len(analysis['pii_detected']) > 0,
            "tags": analysis['suggested_tags'],
            "pii_types": analysis['pii_detected'],
            "sensitivity_level": analysis['sensitivity_level'],
            "summary": analysis['brief_summary']
        }
        
        processor.vault.update_metadata(file_id, metadata)
        
        print(f"[Gateway] Successfully rescanned file: {file_id}")
        return {
            "success": True,
            "message": f"File {file_id} rescanned successfully",
            "analysis": analysis
        }
    except Exception as e:
        print(f"[Gateway] Rescan error: {e}")
        return {"success": False, "message": str(e)}

@app.get("/health")
async def health_check():
    # Check if storage nodes are accessible
    nodes = [f"Node-{i+1}" for i in range(5)]
    node_status = {}
    for node in nodes:
        node_status[node] = "OK" if os.path.exists(f"vault_data/{node}") else "ERROR"
        
    return {
        "cluster_health": "OPTIMAL" if all(s == "OK" for s in node_status.values()) else "DEGRADED",
        "nodes": node_status
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
