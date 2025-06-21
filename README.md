FontSense - AI Font Recognition System \n
System Architecture\n
text\n
fontsense/n
├── **back/**               # Flask API Server\n
│   ├── app.py\n
│   ├── model_utils.py\n
│   ├── Extrafinal.pth\n
│   ├── final_labels.txt\n
│   ├── requirements.txt\n
│   └── uploads/\n
│\n
└── **Frontend1/**          # React Application\n
    ├── public/\n
    ├── src/\n
    │   ├── components/\n
    │   ├── styles/\n
    │   ├── App.jsx\n
    │   └── main.jsx\n
    ├── package.json\n
    └── vite.config.js\n
Installation Instructions\n
Back Setup (Flask API)\n
bash\n
cd back\n
python -m venv venv\n
source venv/bin/activate  # Windows: venv\Scripts\activate\n
pip install -r requirements.txt\n
python app.py\n
Runs on http://localhost:5000\n
\n
Frontend1 Setup (React App)\n
bash\n
cd ../Frontend1\n
npm install\n
npm run dev\n
Runs on http://localhost:3000\n
\n
Key Changes from Original:\n
All references to backend folder changed to back\n

All references to frontend folder changed to Frontend1\n

Maintained case sensitivity (note Frontend1 with capital F)\n

Updated all path references in documentation\n

Preserved all functionality while adapting folder names\n

Deployment Notes\n
When deploying:\n

Update any CI/CD pipelines to reference new folder names\n

Ensure Dockerfiles/build scripts use correct paths\n

Verify frontend API calls point to correct backend URL\n

The system maintains all original features despite folder name changes:\n
✅ Full font recognition capabilities\n
✅ Image upload processing\n
✅ Camera capture functionality\n
✅ Dark/light mode theming\n
\n
