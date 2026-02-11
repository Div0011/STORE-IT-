import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GeminiOCR:
    """
    Real OCR using Gemini Vision API for document text extraction.
    """
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env file")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
    def extract_text_from_image(self, image_path):
        """
        Extract text from an image using Gemini Vision.
        """
        try:
            print(f"[GeminiOCR] Processing image: {image_path}")
            
            # Upload the image
            with open(image_path, 'rb') as img_file:
                image_data = img_file.read()
            
            # Create prompt for text extraction
            prompt = """Extract ALL text from this image. 
            Return the text exactly as it appears, preserving formatting where possible.
            If this is a structured document (ID, certificate, invoice), identify the document type first.
            Format: 
            DOCUMENT_TYPE: [type]
            EXTRACTED_TEXT: [full text]"""
            
            # Use the same model for vision tasks
            response = self.model.generate_content([prompt, {"mime_type": "image/jpeg", "data": image_data}])
            return response.text
            
        except Exception as e:
            print(f"[GeminiOCR] Error: {e}")
            return f"Error extracting text: {str(e)}"
    
    def extract_text_from_pdf(self, pdf_path):
        """
        Extract text from PDF using basic text extraction.
        For scanned PDFs, we'd need to convert pages to images first.
        """
        try:
            import PyPDF2
            print(f"[GeminiOCR] Extracting text from PDF: {pdf_path}")
            
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                
                # If no text extracted (scanned PDF), we'd need image conversion
                if not text.strip():
                    return "SCANNED_PDF: Requires image conversion for OCR"
                
                return text
        except Exception as e:
            print(f"[GeminiOCR] PDF Error: {e}")
            return f"Error extracting PDF text: {str(e)}"

class GeminiAnalyzer:
    """
    Intelligent document analyzer using Gemini for semantic understanding.
    """
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env file")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def analyze_document(self, text, filename=""):
        """
        Analyze document content to extract metadata, detect PII, and categorize.
        """
        try:
            prompt = f"""Analyze this document and provide a structured response in JSON format.

Document filename: {filename}
Document content:
{text[:3000]}

Provide the following information:
1. DOCUMENT_TYPE: What kind of document is this? (e.g., Government ID, Certificate, Invoice, Personal Letter, Medical Record, etc.)
2. PII_DETECTED: List all types of Personally Identifiable Information found (e.g., EMAIL, PHONE, DOB, SSN, ADDRESS, NAME, etc.)
3. SENSITIVITY_LEVEL: Rate from 1-5 (1=public, 5=highly sensitive)
4. SUGGESTED_TAGS: 3-5 relevant tags for categorization
5. BRIEF_SUMMARY: One sentence summary of the document

Return ONLY valid JSON in this exact format:
{{
    "document_type": "string",
    "pii_detected": ["string"],
    "sensitivity_level": number,
    "suggested_tags": ["string"],
    "brief_summary": "string"
}}"""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Extract JSON from markdown code blocks if present
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            elif "```" in result_text:
                result_text = result_text.split("```")[1].split("```")[0].strip()
            
            import json
            analysis = json.loads(result_text)
            
            print(f"[GeminiAnalyzer] Analysis complete: {analysis['document_type']}")
            return analysis
            
        except Exception as e:
            print(f"[GeminiAnalyzer] Error: {e}")
            # Fallback response
            return {
                "document_type": "Unknown",
                "pii_detected": [],
                "sensitivity_level": 1,
                "suggested_tags": ["unclassified"],
                "brief_summary": "Analysis failed"
            }

class RedactionService:
    """
    Anonymizes PII-flagged documents using Gemini.
    """
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env file")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def redact_pii(self, text, pii_types):
        """
        Redact specific PII types from text using Gemini.
        """
        if not pii_types:
            return text
            
        try:
            prompt = f"""Redact the following types of PII from this text: {', '.join(pii_types)}

Replace each instance with [REDACTED_TYPE] where TYPE is the PII category (e.g., [REDACTED_EMAIL], [REDACTED_PHONE]).

Original text:
{text}

Return ONLY the redacted text, nothing else."""

            response = self.model.generate_content(prompt)
            redacted = response.text.strip()
            
            print(f"[RedactionService] Applied {len(pii_types)} redaction layers.")
            return redacted
            
        except Exception as e:
            print(f"[RedactionService] Error: {e}")
            return text

# Example Usage
if __name__ == "__main__":
    # Test OCR
    ocr = GeminiOCR()
    analyzer = GeminiAnalyzer()
    
    # Test with sample text
    sample_text = """
    John Doe
    Email: john.doe@example.com
    Phone: 555-123-4567
    DOB: 01/15/1990
    
    This is a sample document for testing.
    """
    
    analysis = analyzer.analyze_document(sample_text, "test_doc.txt")
    print(f"Analysis Result: {analysis}")
