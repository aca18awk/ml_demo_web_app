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

  return (
    <>
      <div className={styles.resultsCard}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>📊</span>
          Classification Results
        </h3>

        {!results ? (
          <div className={styles.emptyResults}>
            {errorMessage ? (
              <div className={styles.errorMessage}>{errorMessage}</div>
            ) : (
              <div>
                {" "}
                Select an image and click &quot;Classify&quot; to see prediction
                results{" "}
              </div>
            )}
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
    </>
  );
};

export const styles = {
  sectionTitle: "text-xl font-semibold text-gray-800 mb-6 flex items-center",
  sectionIcon: "mr-3",
  resultsCard: "bg-white rounded-2xl p-8 shadow-lg",
  emptyResults: "text-center py-16 text-gray-500 italic bg-gray-50 rounded-xl ",
  resultsContainer: "space-y-3",
  resultItem: {
    base: "flex justify-between items-center p-4 rounded-xl border-l-4",
    top: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-l-white",
    regular: "bg-gray-50 text-gray-800 border-l-indigo-500",
  },
  resultDisease: "font-semibold",
  confidenceBadge: {
    base: "px-3 py-1 rounded-full text-sm font-medium",
    top: "bg-white/20 text-white",
    high: "bg-green-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-red-500 text-white",
  },
};
