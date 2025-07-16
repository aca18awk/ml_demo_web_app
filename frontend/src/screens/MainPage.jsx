import { mainPageStyles } from "../styles/MainPageStyles";

function MainPage({ onNavigate }) {
  return (
    <div className={mainPageStyles.container}>
      <div className={mainPageStyles.mainCard}>
        {/* Header */}
        <div className={mainPageStyles.headerSection}>
          <h1 className={mainPageStyles.title}>AI Medical Demo Platform</h1>
          <p className={mainPageStyles.subtitle}>
            Choose from our AI-powered medical tools for image analysis and
            generation
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
                <h3 className={mainPageStyles.buttonTitle}>
                  Disease Classifier
                </h3>
                <p className={mainPageStyles.buttonDescription}>
                  Upload medical images and get AI-powered disease
                  classification with confidence scores
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
                  Medical Diffusion
                </h3>
                <p className={mainPageStyles.buttonDescription}>
                  Generate synthetic medical images using advanced diffusion
                  models
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className={mainPageStyles.footer}>
          <p>
            ⚡ Powered by PyTorch • AI Medical Platform • Last Updated: March
            2024
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
