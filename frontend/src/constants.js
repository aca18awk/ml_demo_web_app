// options: "CLASSIFIER", "DIFFUSION", "MULTIMODAL"
export const MODEL_TYPE = "MULTIMODAL";

// CLASSIFIER INFO
import earlyGlaucoma2 from "./assets/classification_images/early_glaucoma_2.png";
import advancedGlaucoma1 from "./assets/classification_images/advanced_glaucoma_1.png";
import advancedGlaucoma from "./assets/classification_images/advanced_glaucoma.png";
import normal from "./assets/classification_images/normal.png";

export const CLASSIFIER_MODEL_INFO = {
  name: "Retinal Image Classifier",
  paper: "https://github.com/aca18awk/ml_demo_web_app",
  github: "https://github.com/aca18awk/ml_demo_web_app",
  description:
    "This demo showcases a deep learning model trained on retinal imaging data to classify glaucoma disease progression. The model uses a ResNet-8 architecture fine-tuned on a Harvard-Glaucoma dataset. Accuracy: 94.2% on test set.",
};

export const SAMPLE_IMAGES = [
  {
    id: 0,
    label: "Early Glaucoma",
    filename: earlyGlaucoma2,
  },
  {
    id: 1,
    label: "Advanced Glaucoma",
    filename: advancedGlaucoma1,
  },
  {
    id: 2,
    label: "Advanced Glaucoma",
    filename: advancedGlaucoma,
  },
  {
    id: 3,
    label: "Healthy",
    filename: normal,
  },
];

// DIFFUSION INFO
export const DIFFUSION_MODEL_INFO = {
  name: "Retinal Image Diffusion Model",
  paper: "https://github.com/aca18awk/ml_demo_web_app",
  github: "https://github.com/aca18awk/ml_demo_web_app",
  description:
    "This demo showcases a state-of-the-art diffusion model capable of generating high-quality images across multiple categories. The model uses a U-Net architecture with attention mechanisms, trained on a diverse dataset of 50,000+ images. Generate time: ~30 seconds per image.",
};
