"""
Use a trained classifier to classify retinal images.
"""
import torch as th
from PIL import Image
import torchvision.transforms as transforms

from classifier.RetinalClassifier import RetinalClassifier


MODEL_PATH = "/Users/aleksandrakulbaka/Desktop/phd_code/ML_demo_web_app/backend/classifier/best_acc_model.pt"
CLASS_NAMES = ["Healthy", "Early Glaucoma", "Advanced Glaucoma"]
IMAGE_SIZE = 64

INPUT_FILE = "/Users/aleksandrakulbaka/Desktop/phd_code/ML_demo_web_app/backend/classifier/advanced_glaucoma_1.png"


def dev():
    """
    Get the device to use for torch.distributed.
    """
    if th.cuda.is_available():
        return th.device(f"cuda")
    return th.device("cpu")


def format_results(probabilities, classes_names):
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


def get_prediction(model_path=MODEL_PATH, image_size=IMAGE_SIZE, classes_names=CLASS_NAMES, input_file=INPUT_FILE):
    num_classes = len(classes_names)

    model = RetinalClassifier(
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
    get_prediction()
