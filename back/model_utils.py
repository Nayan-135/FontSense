import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

MODEL_PATH = "Extrafinal.pth"
LABELS_PATH = "final_labels.txt"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load class names
with open(LABELS_PATH, "r") as f:
    class_names = [line.strip() for line in f.readlines()]
num_classes = len(class_names)

# Define model (no pretrained weights to avoid warning)
def get_model():
    base_model = models.mobilenet_v2(weights=None)  # ✅ updated from pretrained=False
    base_model.classifier = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(base_model.last_channel, 128),
        nn.ReLU(),
        nn.Dropout(0.3),
        nn.Linear(128, num_classes)
    )
    return base_model

# Load model
model = get_model()
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model.to(DEVICE)
model.eval()

# Image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Predict function
def load_model_and_predict(image_path, top_k=3):
    image = Image.open(image_path).convert('RGB')
    input_tensor = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = F.softmax(outputs, dim=1)[0]
        top_probs, top_indices = torch.topk(probs, top_k)

    results = [(class_names[i], float(top_probs[j]))
               for j, i in enumerate(top_indices)]
    return results
