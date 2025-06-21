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


## Installation

### Back (Flask API) Setup

1. Navigate to back directory:
   ```bash
   cd back
Create and activate virtual environment:

bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
Install dependencies:

bash
pip install -r requirements.txt
Start the Flask server:

bash
python app.py
API will run on http://localhost:5000

Frontend1 (React App) Setup
Navigate to Frontend1 directory:

bash
cd ../Frontend1
Install dependencies:

bash
npm install
Start development server:

bash
npm run dev
App will run on http://localhost:3000

API Documentation
Endpoint: POST /api/predict

Request:

Content-Type: multipart/form-data

Body: file (image file)

Response:

json
{
  "predictions": [
    {"font": "Cooper Black", "confidence": 0.95},
    {"font": "Bauhaus 93", "confidence": 0.03}
  ]
}
Supported Fonts
The system recognizes 20 font classes including:

Cooper Black

Arial Rounded MT Bold

Bauhaus 93

Rockwell

Old English Text MT
(Full list in back/final_labels.txt)

Deployment
Back Deployment
bash
# Production server:
gunicorn -w 4 -b :5000 app:app

# Docker:
docker build -t fontsense-back .
docker run -p 5000:5000 fontsense-back
Frontend1 Deployment
bash
npm run build  # Deploy /dist folder

