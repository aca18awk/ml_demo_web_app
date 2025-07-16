export const styles = {
  // Main container styles
  container: "min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-5",
  mainCard:
    "max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl",

  // Header styles
  headerSection: "text-center mb-10",
  title:
    "text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent",
  subtitle: "text-xl text-gray-600 leading-relaxed",

  // Model info styles
  modelInfoSection:
    "bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-10 border-l-4 border-indigo-500",
  modelInfoTitle: "text-2xl font-semibold text-gray-800 mb-4 flex items-center",
  modelInfoIcon: "mr-3",
  modelInfoText: "text-gray-600 leading-relaxed",

  // Main demo section styles
  demoGrid: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10",

  // Image selection styles
  imageSelectionCard: "bg-white rounded-2xl p-8 shadow-lg",
  sectionTitle: "text-xl font-semibold text-gray-800 mb-6 flex items-center",
  sectionIcon: "mr-3",
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
  buttonIcon: "mr-2",

  // Results panel styles
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

  // Footer styles
  footer: "text-center text-gray-500 text-sm",

  // Model info buttons
  modelInfoButtonsContainer: "flex gap-4 mt-6 justify-center",
  modelInfoButton:
    "px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center",
  modelInfoButtonIcon: "mr-2",
};
