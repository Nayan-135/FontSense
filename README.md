# FontSense - AI Font Recognition System

![FontSense Logo](https://via.placeholder.com/150) *(Replace with actual logo if available)*

A full-stack application that identifies fonts from images using deep learning, with a Flask API server and React frontend.

## Project Structure

fontsense/
├── back/ # Flask API Server
│ ├── app.py # Main application
│ ├── model_utils.py # Model inference logic
│ ├── Extrafinal.pth # Pretrained model weights
│ ├── final_labels.txt # Supported font classes
│ ├── requirements.txt # Python dependencies
│ └── uploads/ # Temporary image storage
│
└── Frontend1/ # React Application
├── public/ # Static assets
├── src/ # Source files
│ ├── components/ # React components
│ ├── styles/ # CSS files
│ ├── App.jsx # Main application
│ └── main.jsx # Entry point
├── package.json # Frontend dependencies
└── vite.config.js # Vite configuration


---

## 🛠️ Installation Guide

### 📌 Backend (Flask API)

```bash
# Navigate to backend
cd back

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py

📍 The Flask API will be available at: http://localhost:5000

🎨 Frontend (React App)
bash
# Navigate to frontend
cd ../Frontend1

# Install frontend dependencies
npm install

# Start the development server
npm run dev
📍 The React app will be available at: http://localhost:3000


