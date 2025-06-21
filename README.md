FontSense - AI Font Recognition System
System Architecture
text
fontsense/
├── **back/**               # Flask API Server
│   ├── app.py
│   ├── model_utils.py
│   ├── Extrafinal.pth
│   ├── final_labels.txt
│   ├── requirements.txt
│   └── uploads/
│
└── **Frontend1/**          # React Application
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
Installation Instructions
Back Setup (Flask API)
bash
cd back
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
Runs on http://localhost:5000

Frontend1 Setup (React App)
bash
cd ../Frontend1
npm install
npm run dev
Runs on http://localhost:3000

Key Changes from Original:
All references to backend folder changed to back

All references to frontend folder changed to Frontend1

Maintained case sensitivity (note Frontend1 with capital F)

Updated all path references in documentation

Preserved all functionality while adapting folder names

Deployment Notes
When deploying:

Update any CI/CD pipelines to reference new folder names

Ensure Dockerfiles/build scripts use correct paths

Verify frontend API calls point to correct backend URL

The system maintains all original features despite folder name changes:
✅ Full font recognition capabilities
✅ Image upload processing
✅ Camera capture functionality
✅ Dark/light mode theming
