from flask import Flask, request, render_template
import os
import uuid
from model_utils import predict_font

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def index():
    predictions = None
    uploaded_file_path = None

    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = str(uuid.uuid4()) + ".png"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            predictions = predict_font(filepath)
            uploaded_file_path = filepath

    return render_template('index.html', predictions=predictions, image_path=uploaded_file_path)

if __name__ == '__main__':
    app.run(debug=True)
