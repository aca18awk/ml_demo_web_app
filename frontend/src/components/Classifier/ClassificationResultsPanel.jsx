export const ClassificationResultsPanel = ({
  results,
  errorMessage,
  isClassifying,
}) => {
  const getConfidenceClass = (confidence) => {
    if (confidence > 80) return "high";
    if (confidence > 30) return "medium";
    return "low";
  };

  const renderContent = () => {
    if (isClassifying) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Analyzing image...</p>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className={styles.errorState}>
          <span className={styles.errorIcon}>⚠️</span>
          <p>{errorMessage}</p>
        </div>
      );
    }

    if (!results) {
      return (
        <div className={styles.emptyState}>
          <p>
            Select an image and click &ldquo;Classify Selected Image&ldquo; to
            see the prediction results
          </p>
        </div>
      );
    }

    return (
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
            <span className={styles.resultDisease}>{result.class_name}</span>
            <span
              className={`${styles.confidenceBadge.base} ${
                getConfidenceClass(result.confidence) === "high"
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
    );
  };

  return (
    <div className={styles.resultsCard}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>📊</span>
        Classification Results
      </h3>
      {renderContent()}
    </div>
  );
};

export const styles = {
  sectionTitle: "text-xl font-semibold text-gray-800 mb-6 flex items-center",
  sectionIcon: "mr-3",
  resultsCard: "bg-white rounded-2xl p-8 shadow-lg",

  // Loading state
  loadingState: "text-center py-16 text-gray-600 flex flex-col items-center",
  spinner:
    "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4",

  // Error state
  errorState:
    "text-center py-16 text-red-600 bg-red-50 rounded-xl flex flex-col items-center",
  errorIcon: "text-2xl mb-2",

  // Empty state
  emptyState:
    "text-center py-16 text-gray-500 italic bg-gray-50 rounded-xl flex flex-col items-center",
  emptyIcon: "text-2xl mb-2",

  // Results
  resultsContainer: "space-y-3",
  resultItem: {
    base: "flex justify-between items-center p-4 rounded-xl border-l-4",
    top: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-l-white",
    regular: "bg-gray-50 text-gray-800 border-l-indigo-500",
  },
  resultDisease: "font-semibold",
  confidenceBadge: {
    base: "px-3 py-1 rounded-full text-sm font-medium",
    high: "bg-green-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-red-500 text-white",
  },
};
