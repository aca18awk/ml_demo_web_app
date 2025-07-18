# ML Demo Web App

A blueprint machine learning demo application with Flask backend and React frontend. Currently features a retinal image classifier for glaucoma detection.

## Features

- **Working ML Classifier Demo**: Deep learning model for glaucoma disease progression classification
- **Interactive React Frontend**: Sample images with optional user upload functionality
- **Real-time Predictions**: Instant classification with confidence scores
- **Blueprint Architecture**: Easy to adapt for your own ML models

## Project Structure

```
ML_demo_web_app/
├── backend/
│   ├── main.py                    # Flask API endpoints
│   ├── classifier/
│   │   ├── get_prediction.py      # Main prediction function
│   │   └── ...                    # Model architecture and utilities
│   |
├── frontend/
│   ├── src/
│   │   ├── constants.js           # Configuration constants
│   │   ├── App.jsx                # Main React component
│   │   ├── components/            # Reusable UI components
│   │   └── assets/                # Sample images and static assets
│   └── package.json
└── README.md
```

## Quick Start

### Clone the Repository

```bash
git clone https://github.com/aca18awk/ml_demo_web_app.git
cd ml_demo_web_app
```

### Setup and Run

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Backend** (in a new terminal)

```bash
cd backend
python -m venv backend_env
source backend_env/bin/activate  # On Windows: backend_env\Scripts\activate
pip install -r requirements.txt
python main.py
```

**Access the Application**

- Frontend: http://localhost:5173/
- Backend API: http://localhost:8080/

## Customizing for Your Model

### 1. Frontend Configuration (`frontend/src/constants.js`)

Update the constants to match your model:

```javascript
// Model type - set to "CLASSIFIER" for single model
export const MODEL_TYPE = "CLASSIFIER";

// Enable/disable user uploads
export const CAN_USER_UPLOAD_IMAGE = true;

// Update model information
export const CLASSIFIER_MODEL_INFO = {
  name: "Your Model Name",
  paper: "link-to-paper",
  github: "github-repo-link",
  description: "Description of your model and its performance",
};

// Add your sample images
export const SAMPLE_IMAGES = [
  {
    id: 0,
    label: "Class 1",
    filename: yourImage1,
  },
  // Add more samples...
];
```

### 2. Backend Model Integration

Replace the classification logic in `backend/classifier/get_prediction.py`:

```python
def get_prediction(input_file: str, model_path: str = MODEL_PATH,
                  image_size: int = IMAGE_SIZE, classes_names: List[str] = CLASS_NAMES):
    """
    Main prediction function - adapt this to your model.

    Returns:
        List[Dict[str, Union[str, float, bool]]]: Prediction results containing:
            - class_name (str): Name of the predicted class
            - confidence (float): Confidence percentage (0-100)
            - is_top_prediction (bool): Whether this is the highest confidence prediction
    """
    # Replace with your model loading and prediction logic
    # Ensure the return format matches the expected structure
```

### 3. Add Your Assets

- **Sample Images**: Add to `frontend/src/assets/classification_images/`
- **Model Weights**: Replace `backend/classifier/best_acc_model.pt`

## API

- `POST /classify` - Upload image for classification (multipart/form-data)

## Deploying the application

## Requirements

- Python 3.8+
- Node.js 18+
- PyTorch and torchvision
