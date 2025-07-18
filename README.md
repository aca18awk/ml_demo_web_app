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
│   ├── Dockerfile                 # Docker configuration for deployment
│   ├── requirements.txt           # Python dependencies
│   ├── test_endpoints.py          # API testing script
│   └── classifier/
│       ├── get_prediction.py      # Main prediction function
│       ├── best_acc_model.pt      # Trained model weights
│       └── ...                    # Model architecture and utilities
├── frontend/
│   ├── src/
│   │   ├── constants.js           # Configuration constants (API URLs, model info)
│   │   ├── App.jsx                # Main React component
│   │   ├── components/            # Reusable UI components
│   │   └── assets/                # Sample images and static assets
│   ├── package.json               # Node.js dependencies
│   └── vite.config.js             # Vite build configuration
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

## Deployment

### Backend Deployment (Google Cloud Run)

1. **Install Google Cloud CLI**:

```bash
# On macOS
brew install google-cloud-sdk
# Or download from: https://cloud.google.com/sdk/docs/install
```

2. **Initialize and authenticate**:

```bash
gcloud init
gcloud auth login
```

3. **Create a new project** (or use existing):

```bash
gcloud projects create your-project-id --name="ML Demo App"
gcloud config set project your-project-id
```

4. **Enable required APIs**:

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

5. **Deploy from backend directory**:

```bash
cd backend
gcloud run deploy ml-demo-backend \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 1 \
    --max-instances 10
```

Once this completes, you will see the URL of your deployed service.
Update `API_BASE_URL` in `frontend/src/constants.js` with this URL.

6. **Test your deployed backend**:

```bash
cd backend
python test_endpoints.py https://your-service-url.run.app
```

### Frontend Deployment (Firebase Hosting)

1. **Install Firebase CLI**:

```bash
npm install -g firebase-tools
```

2. **Build your React app**:

```bash
cd frontend
npm run build
```

3. **Login and initialize Firebase**:

```bash
firebase login
firebase init hosting
```

- Set public directory to `dist`
- Configure as single-page app: **Yes**
- Don't overwrite index.html

4. **Deploy**:

```bash
firebase deploy
```

### Updating Deployments

**Backend updates**:

```bash
cd backend
gcloud run deploy ml-demo-backend --source .
```

**Frontend updates**:

```bash
cd frontend
npm run build
firebase deploy
```

## References

The retinal images used in this demo are from the Harvard Dataverse:

**"Glaucoma detection from retinal images"**
Harvard Dataverse, V1
DOI: [10.7910/DVN/1YRRAC](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/1YRRAC)

This dataset contains retinal fundus images labeled for glaucoma classification, which were used to train and validate the deep learning model featured in this demo.

## Requirements

- Python 3.8+
- Node.js 18+
- PyTorch and torchvision
