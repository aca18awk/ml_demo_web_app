import { useState } from "react";

import axios from "axios";
import { BackButton } from "../components/BackButton";
import { Footer } from "../components/Footer";
import { CLASSIFIER_MODEL_INFO, SAMPLE_IMAGES } from "../constants";
import { ModelInfo } from "../components/ModelInfo";
import { ClassificationResultsPanel } from "../components/Classifier/ClassificationResultsPanel";
import { SelectImagePanel } from "../components/Classifier/SelectImagePanel";

const Classifier = ({ onBack, shouldGoToMainPage }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClassifying, setIsClassifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [results, setResults] = useState(null);

  const handleClassify = async () => {
    setIsClassifying(true);
    setErrorMessage(null);
    setResults(null);

    try {
      const selectedImageData = SAMPLE_IMAGES[selectedImage];

      const response = await fetch(selectedImageData.filename);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, `image_${selectedImage}.png`);

      const classificationResponse = await axios.post(
        "http://localhost:8080/classify",
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
          <SelectImagePanel
            handleClassify={handleClassify}
            isClassifying={isClassifying}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

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
};
