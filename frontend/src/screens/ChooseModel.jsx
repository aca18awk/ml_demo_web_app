import { Footer } from "../components/Footer";

const ChooseModel = ({ onNavigate }) => {
  return (
    <div className={mainPageStyles.container}>
      <div className={mainPageStyles.mainCard}>
        {/* Header */}
        <div className={mainPageStyles.headerSection}>
          <h1 className={mainPageStyles.title}>AI Medical Demo Platform</h1>
          <p className={mainPageStyles.subtitle}>
            Explore demos for medical image analysis and generation
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className={mainPageStyles.buttonContainer}>
          <button
            onClick={() => onNavigate("CLASSIFIER")}
            className={mainPageStyles.navButton}
          >
            <div className={mainPageStyles.buttonContent}>
              <span className={mainPageStyles.buttonIcon}>🔬</span>
              <div className={mainPageStyles.buttonText}>
                <h3 className={mainPageStyles.buttonTitle}>Classifier Demo</h3>
                <p className={mainPageStyles.buttonDescription}>
                  Classify images for disease detection
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate("DIFFUSION")}
            className={mainPageStyles.navButton}
          >
            <div className={mainPageStyles.buttonContent}>
              <span className={mainPageStyles.buttonIcon}>🎨</span>
              <div className={mainPageStyles.buttonText}>
                <h3 className={mainPageStyles.buttonTitle}>
                  Medical Diffusion Demo
                </h3>
                <p className={mainPageStyles.buttonDescription}>
                  Generate synthetic medical images
                </p>
              </div>
            </div>
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ChooseModel;

const mainPageStyles = {
  // Main container styles
  container: "min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-5",
  mainCard:
    "max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl",

  // Header styles
  headerSection: "text-center mb-12",
  title:
    "text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent",
  subtitle: "text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto",

  // Button container and navigation buttons
  buttonContainer: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",
  navButton:
    "bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group",

  // Button content styles
  buttonContent: "flex flex-col items-center text-center",
  buttonIcon:
    "text-6xl mb-4 group-hover:scale-110 transition-transform duration-300",
  buttonText: "space-y-2",
  buttonTitle:
    "text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300",
  buttonDescription: "text-gray-600 leading-relaxed",
};
