from reportlab.lib.pagesizes import A5
from reportlab.pdfgen import canvas

def create_receipt(text, file_name):
    pdf = canvas.Canvas(file_name, pagesize=A5)
    width, height = A5

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(width / 2, height - 50, "Receipt Summary")

    pdf.setFont("Helvetica", 12)
    text_object = pdf.beginText(50, height - 100)

    for line in text.split("\n"):
        text_object.textLine(line.strip())

    pdf.drawText(text_object)

    pdf.save()

