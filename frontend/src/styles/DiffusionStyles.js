export const diffusionStyles = {
  // Main container styles
  container: "min-h-screen bg-gradient-to-br from-red-400 to-teal-400 p-5",
  mainCard:
    "max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl",

  // Header styles
  headerSection: "text-center mb-10",
  title:
    "text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent",
  subtitle: "text-xl text-gray-600 leading-relaxed",

  // Model info styles
  modelInfoSection:
    "bg-gradient-to-r from-red-50 to-teal-50 rounded-2xl p-8 mb-10 border-l-4 border-red-400",
  modelInfoTitle: "text-2xl font-semibold text-gray-800 mb-4 flex items-center",
  modelInfoIcon: "mr-3",
  modelInfoText: "text-gray-600 leading-relaxed",

  // Main generation section
  generationGrid: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10",

  // Control panel styles
  controlPanel: "bg-white rounded-2xl p-8 shadow-lg",
  sectionTitle: "text-xl font-semibold text-gray-800 mb-6 flex items-center",
  sectionIcon: "mr-3",

  // Class selection styles
  classSelectionContainer: "mb-8",
  classSelectionLabel: "block text-sm font-semibold text-gray-800 mb-3",
  classGrid: "grid grid-cols-2 gap-3",
  classCard: {
    base: "p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md text-center font-medium",
    selected: "bg-gradient-to-r from-red-400 to-teal-400 text-white",
    unselected:
      "bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-red-300",
  },
  classEmoji: "mr-2",

  // Parameter controls styles
  parametersContainer: "space-y-6 mb-8",
  parameterGroup: "",
  parameterLabel: "block text-sm font-semibold text-gray-800 mb-2",
  parameterSliderContainer: "flex items-center space-x-4",
  parameterSlider:
    "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider",
  parameterValue: "min-w-[50px] text-sm font-semibold text-gray-800",

  // Button styles
  generateButton: {
    base: "w-full py-4 bg-gradient-to-r from-red-400 to-teal-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
    disabled:
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mb-4",
  },
  randomButton:
    "w-full py-3 bg-transparent text-red-400 border-2 border-red-400 font-semibold rounded-lg transition-all duration-300 hover:bg-red-400 hover:text-white",
  buttonContent: "flex items-center justify-center",
  spinner: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2",
  buttonIcon: "mr-2",

  // Output panel styles
  outputPanel: "bg-white rounded-2xl p-8 shadow-lg",
  imageOutput:
    "w-full h-96 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-500 italic mb-5 relative overflow-hidden",
  generatedImagePlaceholder:
    "w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg text-gray-600",
  emptyImageText: "",

  // Progress bar styles
  progressContainer: "w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-3",
  progressBar:
    "h-full bg-gradient-to-r from-red-400 to-teal-400 transition-all duration-300",

  // Image info styles
  imageInfoGrid: "grid grid-cols-2 gap-4 mb-5",
  imageInfoCard: "bg-gray-50 p-4 rounded-lg text-center",
  imageInfoLabel: "text-xs text-gray-500 mb-1",
  imageInfoValue: "font-semibold text-gray-800",

  // Action buttons for generated image
  actionButtonsGrid: "grid grid-cols-2 gap-3",
  actionButton:
    "py-3 px-4 border-2 border-teal-400 text-teal-400 font-semibold rounded-lg transition-all duration-300 hover:bg-teal-400 hover:text-white",

  // Footer styles
  footer: "text-center text-gray-500 text-sm",

  // Custom slider styles (for styled-jsx)
  sliderStyles: `
    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #f87171, #4dd0e1);
      border-radius: 50%;
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #f87171, #4dd0e1);
      border-radius: 50%;
      cursor: pointer;
      border: none;
    }
  `,
};
