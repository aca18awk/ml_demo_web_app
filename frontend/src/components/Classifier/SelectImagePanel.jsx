import { SAMPLE_IMAGES } from "../../constants";

export const SelectImagePanel = ({
  handleClassify,
  isClassifying,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <>
      <div className={styles.imageGrid}>
        {SAMPLE_IMAGES.map((image) => (
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
          <span className={styles.buttonContent}>Classify Selected Image</span>
        )}
      </button>
    </>
  );
};

const styles = {
  imageGrid: "grid grid-cols-2 gap-4 mb-6",
  imageCard: {
    base: "border-2 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md",
    selected: "border-indigo-500 bg-indigo-50",
    unselected: "border-gray-200 bg-gray-50 hover:border-indigo-300",
  },
  imagePlaceholder:
    "w-full h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm mb-2",
  imageDisplay: "w-full h-28 rounded-lg object-contain mb-2",
  imageLabel: "text-center text-xs font-medium text-gray-600",

  // Button styles
  classifyButton: {
    base: "w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
    disabled:
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
  buttonContent: "flex items-center justify-center",
  spinner: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2",
};
