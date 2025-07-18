import { useState } from "react";

import axios from "axios";
import { BackButton } from "../components/BackButton";
import { Footer } from "../components/Footer";
import {
  CLASSIFIER_MODEL_INFO,
  SAMPLE_IMAGES,
  CAN_USER_UPLOAD_IMAGE,
  API_BASE_URL,
} from "../constants";
import { ModelInfo } from "../components/ModelInfo";
import { ClassificationResultsPanel } from "../components/Classifier/ClassificationResultsPanel";
import { SelectImagePanel } from "../components/Classifier/SelectImagePanel";
import { UploadImagePanel } from "../components/Classifier/UploadImagePanel";
import { ImageSelectionToggle } from "../components/Classifier/ImageSelectionToggle";

const Classifier = ({ onBack, shouldGoToMainPage }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [useUpload, setUseUpload] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [results, setResults] = useState(null);

  const handleToggleChange = () => {
    if (useUpload) {
      setUploadedImage(null);
    } else {
      setSelectedImage(0);
    }

    setUseUpload(!useUpload);
    setResults(null);
    setErrorMessage(null);
  };

  const handleClassify = async () => {
    setIsClassifying(true);
    setErrorMessage(null);
    setResults(null);

    try {
      let blob;
      let filename;

      if (CAN_USER_UPLOAD_IMAGE && useUpload && uploadedImage) {
        // Use uploaded image
        blob = uploadedImage;
        filename = uploadedImage.name || "uploaded_image.png";
      } else {
        // Use sample image
        const selectedImageData = SAMPLE_IMAGES[selectedImage];
        const response = await fetch(selectedImageData.filename);
        blob = await response.blob();
        filename = `image_${selectedImage}.png`;
      }

      const formData = new FormData();
      formData.append("image", blob, filename);

      const apiUrl = import.meta.env.DEV
        ? "http://localhost:8080"
        : API_BASE_URL;

      const classificationResponse = await axios.post(
        `${apiUrl}/classify`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResults(classificationResponse.data);
    } catch (error) {
      console.error("Classification error:", error);
      setErrorMessage(
        error.response?.data?.error || error.message || "Classification failed"
      );
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <BackButton onBack={onBack} shouldGoToMainPage={shouldGoToMainPage} />

        <div className={styles.headerSection}>
          <h1 className={styles.title}>{CLASSIFIER_MODEL_INFO.name}</h1>
          <p className={styles.subtitle}>
            Select a sample image and get instant disease classification with
            confidence scores.
          </p>
        </div>

        <ModelInfo
          modelInfo={CLASSIFIER_MODEL_INFO.description}
          githubLink={CLASSIFIER_MODEL_INFO.github}
          paperLink={CLASSIFIER_MODEL_INFO.paper}
          icon="🔬"
        />

        <div className={styles.demoGrid}>
          <div className={styles.imageSelectionCard}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📸</span>
              Select an Image for Classification
            </h3>

            <ImageSelectionToggle
              handleToggleChange={handleToggleChange}
              useUpload={useUpload}
            />

            {CAN_USER_UPLOAD_IMAGE && useUpload ? (
              <UploadImagePanel
                handleClassify={handleClassify}
                isClassifying={isClassifying}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
              />
            ) : (
              <SelectImagePanel
                handleClassify={handleClassify}
                isClassifying={isClassifying}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )}
          </div>

          <ClassificationResultsPanel
            results={results}
            errorMessage={errorMessage}
            isClassifying={isClassifying}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Classifier;

const styles = {
  // Main container styles
  container: "min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-5",
  mainCard:
    "max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl",

  // Header styles
  headerSection: "text-center mb-10",
  title:
    "text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent",
  subtitle: "text-xl text-gray-600 leading-relaxed",

  // Main demo section styles
  demoGrid: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10",

  // Image selection card styles
  imageSelectionCard: "bg-white rounded-2xl p-8 shadow-lg",
  sectionTitle: "text-xl font-semibold text-gray-800 mb-6 flex items-center",
  sectionIcon: "mr-3",
};
