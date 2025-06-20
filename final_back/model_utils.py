from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Load model
model = load_model("Extra3.h5")
img_size = (224, 224)

# Replace this list with actual class names used during training
class_names = [
    'Algerian', 'Angsana New', 'Arial Rounded MT Bold', 'Baguet Script', 'Bauhaus 93', 'Bell MT', 'Bernard MT Condensed', 'Blackadder ITC', 'Bodoni MT Poster Compressed', 'Bradley Hand ITC', 'Cooper Black', 'Forte', 'Goudy Stout', 'Old English Text MT', 'Ravie', 'Rockwell', 'STCaiyun', 'Sitka Display', 'Snap ITC', 'Yu Gothic'
]

def predict_font(img_path):
    img = image.load_img(img_path, target_size=img_size)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]
    top_indices = predictions.argsort()[-3:][::-1]

    top_predictions = []
    for i in top_indices:
        if i < len(class_names):
            top_predictions.append((class_names[i], round(predictions[i] * 100, 2)))
    return top_predictions
