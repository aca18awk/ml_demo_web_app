"""
Use a trained classifier to classify retinal images.
"""
import torch as th
from typing import List
import os

from classifier.Classifier import Classifier
from classifier.helpers import dev, format_results, classify_image


CLASS_NAMES = ["Healthy", "Early Glaucoma", "Advanced Glaucoma"]

MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_acc_model.pt")
INPUT_FILE = os.path.join(os.path.dirname(__file__), "advanced_glaucoma_1.png")
IMAGE_SIZE = 64


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
