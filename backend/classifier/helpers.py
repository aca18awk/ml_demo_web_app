import torch as th
from PIL import Image
import torchvision.transforms as transforms


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
