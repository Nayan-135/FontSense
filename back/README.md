# Font Classification System

A Flask-based web API that classifies fonts in uploaded images using a PyTorch deep learning model.

## Features

- Accepts image uploads via API
- Classifies fonts using a pre-trained MobileNetV2 model
- Returns top 3 predicted font classes with confidence scores
- Cross-origin resource sharing (CORS) enabled
- Simple and lightweight implementation

## Prerequisites

- Python 3.7+
- pip

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nayan-135/font-classifier.git
   cd font-classifier
   cd back


   python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

pip install -r requirements.txt


python app.py

Structure 

.
├── app.py                # Flask application
├── model_utils.py        # Model loading and prediction logic
├── final_labels.txt      # List of supported font classes
├── Extrafinal.pth        # Pretrained model weights
├── requirements.txt      # Python dependencies
├── uploads/              # Temporary storage for uploaded images
└── README.md             # This file
