# 🧠 Font Style Classifier (Flask + TensorFlow)

This project is a Flask-based backend that loads a trained TensorFlow model (`.h5`) to predict the font style from uploaded images. The frontend is a minimal HTML page where users can upload an image and view the top-3 predicted fonts with confidence scores.

---

## 🚀 Features

- Upload image through a simple HTML form
- Predict top-3 font classes using a MobileNetV2-based model
- View uploaded image and predictions directly
- Clean project structure and safe error handling

---

## 📁 Project Structure


---

## ⚙️ Setup Instructions

### 1. ✅ Install Python 3.11

[Download Python 3.11](https://www.python.org/downloads/release/python-3110/)

Make sure to check **"Add to PATH"** during installation.

---

### 2. ✅ Create and Activate Virtual Environment

```bash
py -3.11 -m venv venv
venv\Scripts\activate      # On Windows
# source venv/bin/activate # On macOS/Linux
pip install -r requirements.txt
python app.py
