from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'models/font_classifier_model.h5'
IMG_HEIGHT = 224
IMG_WIDTH = 224

FONT_CLASSES = [
    'Arial',
    'Times New Roman', 
    'Calibri',
    'Helvetica',
    'Comic Sans MS',
    'Verdana',
    'Georgia',
    'Impact'
]

model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(file):
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    image = image.resize((IMG_WIDTH, IMG_HEIGHT))
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.route('/')
def index():
    return jsonify({"message": "Font Recognition API"}), 200

@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'Image not found'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        img_array = preprocess_image(file)
        prediction = model.predict(img_array)
        predicted_idx = np.argmax(prediction[0])
        confidence = float(prediction[0][predicted_idx])

        top3_idx = np.argsort(prediction[0])[::-1][:3]
        top3 = [{"font": FONT_CLASSES[i], "confidence": round(float(prediction[0][i]) * 100, 2)} for i in top3_idx]

        return jsonify({
            "predicted_font": FONT_CLASSES[predicted_idx],
            "confidence": round(confidence * 100, 2),
            "top_predictions": top3
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
