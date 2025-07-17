"""
Use a trained classifier to classify retinal images.
"""
import torch as th
from PIL import Image
import torchvision.transforms as transforms
from typing import List

from classifier.Classifier import Classifier


CLASS_NAMES = ["Healthy", "Early Glaucoma", "Advanced Glaucoma"]

MODEL_PATH = "/Users/aleksandrakulbaka/Desktop/phd_code/ML_demo_web_app/backend/classifier/best_acc_model.pt"
INPUT_FILE = "/Users/aleksandrakulbaka/Desktop/phd_code/ML_demo_web_app/backend/classifier/advanced_glaucoma_1.png"
IMAGE_SIZE = 64


def dev():
    """
    Get the device to use for torch.distributed.
    """
    if th.cuda.is_available():
        return th.device(f"cuda")
    return th.device("cpu")


def format_results(probabilities, classes_names):
    """
    Format classification probabilities into a structured result format.

    Returns:
        List of dictionaries, each containing:
        - class_name (str): Name of the predicted class
        - confidence (float): Confidence percentage (0-100)
        - is_top_prediction (bool): Whether this is the highest confidence prediction
    """
    max_confidence = max(probabilities)
    formatted_results = []
    for i, prob in enumerate(probabilities):
        formatted_results.append({
            "class_name": classes_names[i],
            "confidence": round(float(prob * 100), 2),
            "is_top_prediction": bool(prob == max_confidence)
        })

    return formatted_results


def classify_image(model, image_path, device, image_size):
    """Classify an image using the trained model."""

    transform = transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])

    image = Image.open(image_path).convert("RGB")
    image_tensor = transform(image)
    if not isinstance(image_tensor, th.Tensor):
        image_tensor = transforms.ToTensor()(image_tensor)
    image_tensor = image_tensor.unsqueeze(0).to(device)

    with th.no_grad():
        logits = model(image_tensor)
        probs = th.softmax(logits, dim=1).cpu().numpy()[0]

    return probs


def get_prediction(input_file: str, model_path: str = MODEL_PATH, image_size: int = IMAGE_SIZE, classes_names: List[str] = CLASS_NAMES):
    """
    Main prediction function that classifies an input image.

    Args:
        input_file (str): Path to the image file to classify
        model_path (str): Path to the trained model weights file
        image_size (int): Size to resize images to (default: 64)
        classes_names (List[str]): List of class names for classification

    Returns:
        List[Dict[str, Union[str, float, bool]]]: List of prediction results, each containing:
            - class_name (str): Name of the predicted class
            - confidence (float): Confidence percentage (0-100)
            - is_top_prediction (bool): Whether this is the highest confidence prediction

    When extending the code to your model - make sure the return format matches the above.
    """
    num_classes = len(classes_names)

    model = Classifier(
        image_size=image_size, num_classes=num_classes)
    model.load_state_dict(th.load(model_path, map_location="cpu"))
    model.to(dev())
    model.eval()

    print(f"Classifying image {input_file}...")
    probs = classify_image(
        model, input_file, dev(), image_size
    )

    formatted_results = format_results(probs, classes_names)

    return formatted_results


if __name__ == "__main__":
    get_prediction(input_file=INPUT_FILE)
