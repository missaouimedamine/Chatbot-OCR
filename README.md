# 🧾 OCR Chatbot – Image to PDF Receipt Generator
📖 Overview

This project is an OCR-powered chatbot that allows users to upload an image (such as a receipt), automatically extract text using Google Gemini OCR, and generate a downloadable PDF receipt.

The system is built with:

Backend: FastAPI
 + Python

OCR Model: Gemini AI OCR

Deployment: Dockerized and hosted on Hugging Face Spaces

Frontend: Static website (HTML, CSS, JS) hosted on Netlify Cloud

⚙️ Features

Upload image files for OCR text extraction

Convert extracted text into a clean, formatted PDF receipt

Download the generated PDF instantly

Fully containerized and deployed as a service

Simple, responsive, and minimal frontend design

🧠 Tech Stack
Layer	Technology
Backend	Python, FastAPI
OCR Engine	Gemini OCR Model
PDF Generation	ReportLab
Deployment	Docker + Hugging Face Spaces
Frontend	HTML, CSS, JavaScript (Netlify Hosting)
🚀 Setup & Run Locally
1️⃣ Clone the repository
git clone https://github.com/yourusername/ocr-chatbot.git
cd ocr-chatbot

2️⃣ Create a Python virtual environment
python3 -m venv venv
source venv/bin/activate      # On macOS/Linux
venv\Scripts\activate         # On Windows

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Run the FastAPI backend
uvicorn main:app --reload


The API will be available at 👉 http://127.0.0.1:8000

🐳 Deploy with Docker

To build and run the container locally:

docker build -t ocr-chatbot .
docker run -p 7860:7860 ocr-chatbot


This configuration matches the Hugging Face Spaces runtime.

🌐 Frontend

The frontend is a simple static website hosted on Netlify, designed for smooth user interaction.
It was adapted and simplified from a ready-made template available here
.

📚 References & Resources

Gemini AI Studio

ReportLab Documentation

FastAPI Documentation

Hugging Face Spaces Docs
