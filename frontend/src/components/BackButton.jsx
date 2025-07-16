export const BackButton = ({ onBack, shouldGoToMainPage }) => {
  return (
    <>
      {shouldGoToMainPage ? (
        <button onClick={onBack} className={styles.backButton}>
          <span className={styles.backButtonIcon}>←</span>
          Back to Main
        </button>
      ) : null}
    </>
  );
};

const styles = {
  backButton:
    "mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 flex items-center",
  backButtonIcon: "mr-2",
};
