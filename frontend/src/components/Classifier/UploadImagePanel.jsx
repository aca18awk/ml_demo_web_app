import { useRef } from "react";

export const UploadImagePanel = ({
  handleClassify,
  isClassifying,
  uploadedImage,
  setUploadedImage,
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setUploadedImage(file);
    } else {
      alert("Please select a PNG or JPG image file.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setUploadedImage(file);
    } else {
      alert("Please select a PNG or JPG image file.");
    }
  };

  return (
    <>
      <div className={styles.uploadSection}>
        {uploadedImage ? (
          <div className={styles.uploadedImageContainer}>
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded image"
              className={styles.uploadedImage}
            />
            <button
              onClick={() => setUploadedImage(null)}
              className={styles.removeButton}
            >
              ✕ Remove Image
            </button>
          </div>
        ) : (
          <div
            className={styles.uploadArea}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.uploadContent}>
              <div className={styles.uploadIcon}>📁</div>
              <p className={styles.uploadText}>
                Click to upload or drag and drop
              </p>
              <p className={styles.uploadSubtext}>PNG or JPG files only</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      <button
        onClick={handleClassify}
        disabled={isClassifying || !uploadedImage}
        className={`${styles.classifyButton.base} ${styles.classifyButton.disabled}`}
      >
        {isClassifying ? (
          <span className={styles.buttonContent}>
            <div className={styles.spinner}></div>
            Classifying...
          </span>
        ) : (
          <span className={styles.buttonContent}>Classify Uploaded Image</span>
        )}
      </button>
    </>
  );
};

const styles = {
  // Upload section styles
  uploadSection: "mb-6",
  uploadArea:
    "border-2 border-dashed border-gray-300 rounded-xl p-12 cursor-pointer transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50",
  uploadContent: "text-center",
  uploadIcon: "text-6xl mb-4",
  uploadText: "text-lg font-semibold text-gray-700 mb-2",
  uploadSubtext: "text-sm text-gray-500",

  // Uploaded image display styles
  uploadedImageContainer: "relative",
  uploadedImage: "w-full max-w-md mx-auto rounded-xl shadow-lg object-contain",
  removeButton:
    "mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300",

  // Button styles
  classifyButton: {
    base: "w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
    disabled:
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
  buttonContent: "flex items-center justify-center",
  spinner: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2",
};
