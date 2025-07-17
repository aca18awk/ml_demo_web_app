# ML Demo Web App

A machine learning demo web application featuring retinal image classification with Flask backend and React frontend.

**Tutorial reference**: https://youtu.be/ctQMqqEo4G8?si=9RymLsDTRMrStxL5

## Features

- **Retinal Image Classifier**: Deep learning model for glaucoma disease progression classification
- **Interactive UI**: React frontend with sample images and optional user upload functionality
- **Real-time Classification**: Instant predictions with confidence scores
- **Responsive Design**: Modern UI built with Tailwind CSS

## Project Structure

```
ML_demo_web_app/
├── backend/
│   ├── main.py                    # Flask application entry point
│   ├── classifier/
│   │   ├── classifier.py          # Classification logic
│   │   ├── RetinalClassifier.py   # PyTorch model definition
│   │   └── best_acc_model.pt      # Trained model weights
│   └── backend_env/               # Python virtual environment
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main React component
│   │   ├── constants.js          # Configuration constants
│   │   ├── screens/              # Main application screens
│   │   ├── components/           # Reusable UI components
│   │   └── assets/               # Static assets (sample images)
│   ├── package.json              # Node.js dependencies
│   └── vite.config.js            # Vite configuration
└── README.md
```

## Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 18+ (use `nvm install node` for latest version)
- PyTorch and torchvision

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Create and activate virtual environment:

   ```bash
   python -m venv backend_env
   source backend_env/bin/activate  # On Windows: backend_env\Scripts\activate
   ```

3. Install Python dependencies:

   ```bash
   pip install flask flask-cors torch torchvision pillow
   ```

4. Start the Flask server:
   ```bash
   python main.py
   ```
   Backend runs on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## Usage

1. Start both backend and frontend servers (see setup instructions above)
2. Open browser to `http://localhost:5173`
3. Select from sample retinal images or upload your own (PNG/JPG)
4. Click "Classify" to get instant predictions with confidence scores
5. View results showing disease classification (Healthy, Early Glaucoma, Advanced Glaucoma)

## Configuration

### Key Settings (`frontend/src/constants.js`)

- `MODEL_TYPE`: Set to `"CLASSIFIER"` for single model or `"MULTIMODAL"` for model selection
- `CAN_USER_UPLOAD_IMAGE`: Enable/disable user image upload functionality

### Customization

- **Sample Images**: Add images to `frontend/src/assets/classification_images/`
- **Model**: Replace `backend/classifier/best_acc_model.pt` with your trained model
- **Classes**: Update `CLASS_NAMES` in `backend/classifier/classifier.py`

## API Endpoints

- `POST /classify` - Upload image for classification (multipart/form-data)

## Future Extensions

- **Diffusion Model**: Framework ready for adding generative models
