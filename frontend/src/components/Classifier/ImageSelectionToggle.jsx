import { CAN_USER_UPLOAD_IMAGE } from "../../constants";

export const ImageSelectionToggle = ({ handleToggleChange, useUpload }) => {
  return (
    <>
      {CAN_USER_UPLOAD_IMAGE && (
        <div className={styles.toggleSection}>
          <div className={styles.toggleContainer}>
            <span
              className={`${styles.toggleLabel} ${
                !useUpload
                  ? styles.toggleLabelActive
                  : styles.toggleLabelInactive
              }`}
            >
              Sample Images
            </span>
            <div
              className={`${styles.toggleSwitch} ${
                useUpload ? "bg-indigo-400" : ""
              }`}
              onClick={handleToggleChange}
            >
              <div
                className={`${styles.toggleSlider} ${
                  useUpload ? styles.toggleSliderActive : ""
                }`}
              ></div>
            </div>
            <span
              className={`${styles.toggleLabel} ${
                useUpload
                  ? styles.toggleLabelActive
                  : styles.toggleLabelInactive
              }`}
            >
              Upload Image
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  // Toggle section styles
  toggleSection: "mb-8",
  toggleContainer: "flex items-center justify-center gap-4",
  toggleLabel: "text-lg font-medium transition-colors duration-300",
  toggleLabelActive: "text-indigo-600",
  toggleLabelInactive: "text-gray-400",
  toggleSwitch:
    "relative w-16 h-8 bg-gray-300 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-400",
  toggleSlider:
    "absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300",
  toggleSliderActive: "transform translate-x-8 !bg-indigo-600 shadow-lg",

  // Main demo section styles
  demoGrid: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10",
};
