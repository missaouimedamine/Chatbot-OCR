from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image
import io
import os
import google.generativeai as genai
from fastapi.responses import FileResponse
from pdf_generator import create_receipt


genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

app = FastAPI()

class OCRResponse(BaseModel):
    extracted_text: str

@app.post("/ocr-image/", response_model=OCRResponse)
async def ocr_image(file: UploadFile = File(...)):
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

    
        model = genai.GenerativeModel('gemini-2.0-flash')

        prompt = "Extract and Identify all text from this image and generate a receipt without any additional information."
        contents = [prompt, image]

        response = model.generate_content(contents)

        extracted_text = response.text

        create_receipt(extracted_text, file_name="result/receipt.pdf")
        return FileResponse(path="result/receipt.pdf", filename="receipt.pdf", media_type='application/pdf')

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR failed: {str(e)}")

