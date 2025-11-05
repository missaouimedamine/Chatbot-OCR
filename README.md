# 🧾 OCR Chatbot – Image to PDF Receipt Generator

## 📖 Overview

This project is an OCR-powered chatbot that allows users to upload an image, automatically extract text using Google Gemini OCR, and generate a downloadable PDF receipt.

**The system is built with:**
- **Backend:** FastAPI + Python
- **OCR Model:** Gemini AI OCR
- **PDF Generation:** ReportLab
- **Deployment:** Dockerized and hosted on Hugging Face Spaces
- **Frontend:** Static website (HTML, CSS, JS) hosted on Netlify Cloud


**Direct Access**
You Can Access the:
- Backend hosted on HuggingFace from this [link](https://missaoui-ocr-fastapi.hf.space/docs)
- Frontend hosted on Netfify Cloud on this [link](https://chatbotocr.netlify.app/)

## 🚀 Setup & Run Locally

1️⃣ **Clone the repository**
```bash
git clone https://github.com/missaouimedamine/Chatbot-OCR.git
cd Chatbot-OCR
cd backend
```

2️⃣ **Create a Python virtual environment**
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3️⃣ **Install dependencies**
```bash
pip install -r requirements.txt
```

4️⃣ **Run the FastAPI backend**
```bash
uvicorn main:app --reload
```
The API will be available at 👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🐳 Deploy with Docker

To build and run the container locally:

```bash
docker build -t ocr-chatbot .
docker run -p 7860:7860 ocr-chatbot
```

This configuration matches the Hugging Face Spaces runtime.

---

## 🌐 Frontend

The frontend is a simple static website hosted on Netlify, designed for smooth user interaction.
It was adapted and simplified from a ready-made template.

---

## 📚 References & Resources
you find here all the resources used.
- [Gemini AI Studio](https://ai.google.dev/gemini-api/docs)
- [ReportLab Documentation](https://www.reportlab.com/docs/reportlab-userguide.pdf)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Hugging Face Spaces Docs](https://huggingface.co/docs/spaces)
- [Chatbot Static Template](https://www.codingnepalweb.com/gemini-ai-chatbot-html-css-javascript/)
