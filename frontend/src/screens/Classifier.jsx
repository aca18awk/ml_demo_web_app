import { useState } from "react";
import { styles } from "../styles/AppStyles";

// Import images
import earlyGlaucoma2 from "../assets/classification_images/early_glaucoma_2.png";
import advancedGlaucoma1 from "../assets/classification_images/advanced_glaucoma_1.png";
import advancedGlaucoma from "../assets/classification_images/advanced_glaucoma.png";
import normal from "../assets/classification_images/normal.png";
import axios from "axios";

function Classifier({ onBack, shouldGoToMainPage }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClassifying, setIsClassifying] = useState(false);
  const [results, setResults] = useState(null);

  const sampleImages = [
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

  const handleClassify = async () => {
    setIsClassifying(true);

    const response = await axios.get("http://localhost:8080/classify");

    setResults(response.data);
    setIsClassifying(false);
  };

  const getConfidenceClass = (confidence) => {
    if (confidence > 80) return "high";
    if (confidence > 30) return "medium";
    return "low";
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        {/* Back Button */}
        {shouldGoToMainPage ? (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">←</span>
            Back to Main
          </button>
        ) : null}

        {/* Header */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Glaucoma Classification Demo</h1>
          <p className={styles.subtitle}>
            Select a sample image and get instant disease classification with
            confidence scores
          </p>
        </div>

        {/* Model Info */}
        <div className={styles.modelInfoSection}>
          <h2 className={styles.modelInfoTitle}>
            <span className={styles.modelInfoIcon}>🔬</span>
            Model Information
          </h2>
          <p className={styles.modelInfoText}>
            This demo showcases a deep learning model trained on retinal imaging
            data to classify glaucoma disease progression. The model uses a
            ResNet-8 architecture fine-tuned on a Harvard-Glaucoma dataset.
            Accuracy: 94.2% on test set.
          </p>
          <div className={styles.modelInfoButtonsContainer}>
            <button className={styles.modelInfoButton}>
              <span className={styles.modelInfoButtonIcon}>📄</span>
              See the Paper
            </button>
            <button className={styles.modelInfoButton}>
              <span className={styles.modelInfoButtonIcon}>💻</span>
              GitHub Code
            </button>
          </div>
        </div>

        {/* Main Demo Section */}
        <div className={styles.demoGrid}>
          {/* Image Selection */}
          <div className={styles.imageSelectionCard}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📸</span>
              Select an Image for Classification
            </h3>

            <div className={styles.imageGrid}>
              {sampleImages.map((image) => (
                <div
                  key={image.id}
                  className={`${styles.imageCard.base} ${
                    selectedImage === image.id
                      ? styles.imageCard.selected
                      : styles.imageCard.unselected
                  }`}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.filename}
                    alt={image.label}
                    className={styles.imageDisplay}
                  />
                  <div
                    className={styles.imagePlaceholder}
                    style={{ display: "none" }}
                  >
                    Sample Image {image.id + 1}
                  </div>
                  <div className={styles.imageLabel}>{image.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={handleClassify}
              disabled={isClassifying}
              className={`${styles.classifyButton.base} ${styles.classifyButton.disabled}`}
            >
              {isClassifying ? (
                <span className={styles.buttonContent}>
                  <div className={styles.spinner}></div>
                  Classifying...
                </span>
              ) : (
                <span className={styles.buttonContent}>
                  Classify Selected Image
                </span>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className={styles.resultsCard}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📊</span>
              Classification Results
            </h3>

            {!results ? (
              <div className={styles.emptyResults}>
                Select an image and click "Classify" to see prediction results
              </div>
            ) : (
              <div className={styles.resultsContainer}>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`${styles.resultItem.base} ${
                      result.is_top_prediction
                        ? styles.resultItem.top
                        : styles.resultItem.regular
                    }`}
                  >
                    <span className={styles.resultDisease}>
                      {result.class_name}
                    </span>
                    <span
                      className={`${styles.confidenceBadge.base} ${
                        result.isTop
                          ? styles.confidenceBadge.top
                          : getConfidenceClass(result.confidence) === "high"
                          ? styles.confidenceBadge.high
                          : getConfidenceClass(result.confidence) === "medium"
                          ? styles.confidenceBadge.medium
                          : styles.confidenceBadge.low
                      }`}
                    >
                      {result.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Aleksandra Kulbaka • made with{" "}
            <a
              href="https://github.com/aca18awk/ml_demo_web_app"
              target="_blank"
            >
              ML demo web app
            </a>{" "}
            template
          </p>
        </div>
      </div>
    </div>
  );
}

export default Classifier;
