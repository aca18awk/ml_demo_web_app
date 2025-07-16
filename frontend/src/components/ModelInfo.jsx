export const ModelInfo = ({ modelInfo, githubLink, paperLink, icon }) => {
  return (
    <>
      <div className={styles.modelInfoSection}>
        <h2 className={styles.modelInfoTitle}>
          <span className={styles.modelInfoIcon}>{icon}</span>
          Model Information
        </h2>
        <p className={styles.modelInfoText}>{modelInfo}</p>

        <div className={styles.modelInfoButtonsContainer}>
          <a href={paperLink} target="_blank" rel="noreferrer">
            <button className={styles.modelInfoButton}>
              <span className={styles.modelInfoButtonIcon}>📄</span>
              See the Paper
            </button>
          </a>
          <a href={githubLink} target="_blank" rel="noreferrer">
            <button className={styles.modelInfoButton}>
              <span className={styles.modelInfoButtonIcon}>💻</span>
              GitHub Code
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

const styles = {
  modelInfoSection:
    "bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-10 border-l-4 border-indigo-500",
  modelInfoTitle: "text-2xl font-semibold text-gray-800 mb-4 flex items-center",
  modelInfoIcon: "mr-3",
  modelInfoText: "text-gray-600 leading-relaxed",
  modelInfoButtonsContainer: "flex gap-4 mt-6 justify-center",
  modelInfoButton:
    "px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center",
  modelInfoButtonIcon: "mr-2",
};
