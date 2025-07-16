import { useState } from "react";
import { BackButton } from "../components/BackButton";
import { Footer } from "../components/Footer";
import { DIFFUSION_MODEL_INFO } from "../constants";
import { ModelInfo } from "../components/ModelInfo";

const DiffusionModel = ({ onBack, shouldGoToMainPage }) => {
  const [selectedClass, setSelectedClass] = useState("Flowers");
  const [parameters, setParameters] = useState({
    guidanceScale: 7.5,
    inferenceSteps: 50,
    creativityLevel: 5,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  const imageClasses = [
    { name: "Flowers", emoji: "🌸" },
    { name: "Landscapes", emoji: "🏞️" },
    { name: "Animals", emoji: "🐕" },
    { name: "Architecture", emoji: "🏙️" },
    { name: "Food", emoji: "🍎" },
    { name: "Abstract", emoji: "🎭" },
  ];

  const handleParameterChange = (param, value) => {
    setParameters((prev) => ({
      ...prev,
      [param]: parseFloat(value),
    }));
  };

  const handleRandomizeParameters = () => {
    setParameters({
      guidanceScale: Math.random() * 19 + 1,
      inferenceSteps: Math.floor(Math.random() * 90) + 10,
      creativityLevel: Math.floor(Math.random() * 11),
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImage(null);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGeneratedImage(`Generated ${selectedClass} Sample`);
            setImageInfo({
              generationTime: (Math.random() * 30 + 20).toFixed(1) + "s",
              modelVersion: "v2.1",
              resolution: "512x512",
              seed: Math.floor(Math.random() * 99999),
            });
            setIsGenerating(false);
            setProgress(0);
          }, 500);
        }
        return Math.min(newProgress, 100);
      });
    }, 150);
  };

  return (
    <div className={diffusionStyles.container}>
      <div className={diffusionStyles.mainCard}>
        <BackButton onBack={onBack} shouldGoToMainPage={shouldGoToMainPage} />

        {/* Header */}
        <div className={diffusionStyles.headerSection}>
          <h1 className={diffusionStyles.title}>AI Image Generator</h1>
          <p className={diffusionStyles.subtitle}>
            Generate high-quality images from different classes using advanced
            diffusion models
          </p>
        </div>

        <ModelInfo
          modelInfo={DIFFUSION_MODEL_INFO.description}
          githubLink={DIFFUSION_MODEL_INFO.github}
          paperLink={DIFFUSION_MODEL_INFO.paper}
          icon="🎨"
        />

        {/* Main Generation Section */}
        <div className={diffusionStyles.generationGrid}>
          {/* Control Panel */}
          <div className={diffusionStyles.controlPanel}>
            <h3 className={diffusionStyles.sectionTitle}>
              <span className={diffusionStyles.sectionIcon}>🎯</span>
              Generation Controls
            </h3>

            {/* Class Selection */}
            <div className={diffusionStyles.classSelectionContainer}>
              <label className={diffusionStyles.classSelectionLabel}>
                Select Image Class:
              </label>
              <div className={diffusionStyles.classGrid}>
                {imageClasses.map((cls) => (
                  <div
                    key={cls.name}
                    className={`${diffusionStyles.classCard.base} ${
                      selectedClass === cls.name
                        ? diffusionStyles.classCard.selected
                        : diffusionStyles.classCard.unselected
                    }`}
                    onClick={() => setSelectedClass(cls.name)}
                  >
                    <span className={diffusionStyles.classEmoji}>
                      {cls.emoji}
                    </span>
                    {cls.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Parameters */}
            <div className={diffusionStyles.parametersContainer}>
              <div className={diffusionStyles.parameterGroup}>
                <label className={diffusionStyles.parameterLabel}>
                  Guidance Scale:
                </label>
                <div className={diffusionStyles.parameterSliderContainer}>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={parameters.guidanceScale}
                    onChange={(e) =>
                      handleParameterChange("guidanceScale", e.target.value)
                    }
                    className={diffusionStyles.parameterSlider}
                  />
                  <span className={diffusionStyles.parameterValue}>
                    {parameters.guidanceScale.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className={diffusionStyles.parameterGroup}>
                <label className={diffusionStyles.parameterLabel}>
                  Inference Steps:
                </label>
                <div className={diffusionStyles.parameterSliderContainer}>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={parameters.inferenceSteps}
                    onChange={(e) =>
                      handleParameterChange("inferenceSteps", e.target.value)
                    }
                    className={diffusionStyles.parameterSlider}
                  />
                  <span className={diffusionStyles.parameterValue}>
                    {Math.round(parameters.inferenceSteps)}
                  </span>
                </div>
              </div>

              <div className={diffusionStyles.parameterGroup}>
                <label className={diffusionStyles.parameterLabel}>
                  Creativity Level:
                </label>
                <div className={diffusionStyles.parameterSliderContainer}>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={parameters.creativityLevel}
                    onChange={(e) =>
                      handleParameterChange("creativityLevel", e.target.value)
                    }
                    className={diffusionStyles.parameterSlider}
                  />
                  <span className={diffusionStyles.parameterValue}>
                    {Math.round(parameters.creativityLevel)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`${diffusionStyles.generateButton.base} ${diffusionStyles.generateButton.disabled}`}
            >
              {isGenerating ? (
                <span className={diffusionStyles.buttonContent}>
                  <div className={diffusionStyles.spinner}></div>
                  Generating...
                </span>
              ) : (
                <span className={diffusionStyles.buttonContent}>
                  <span className={diffusionStyles.buttonIcon}>✨</span>
                  Generate Image
                </span>
              )}
            </button>

            <button
              onClick={handleRandomizeParameters}
              className={diffusionStyles.randomButton}
            >
              <span className={diffusionStyles.buttonIcon}>🎲</span>
              Random Parameters
            </button>
          </div>

          {/* Output Panel */}
          <div className={diffusionStyles.outputPanel}>
            <h3 className={diffusionStyles.sectionTitle}>
              <span className={diffusionStyles.sectionIcon}>🖼️</span>
              Generated Output
            </h3>

            {/* Image Output */}
            <div className={diffusionStyles.imageOutput}>
              {generatedImage ? (
                <div className={diffusionStyles.generatedImagePlaceholder}>
                  {generatedImage}
                </div>
              ) : (
                <span className={diffusionStyles.emptyImageText}>
                  Click "Generate Image" to create a new sample
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {isGenerating && (
              <div className={diffusionStyles.progressContainer}>
                <div
                  className={diffusionStyles.progressBar}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {/* Image Info */}
            {imageInfo && (
              <div className={diffusionStyles.imageInfoGrid}>
                <div className={diffusionStyles.imageInfoCard}>
                  <div className={diffusionStyles.imageInfoLabel}>
                    Generation Time
                  </div>
                  <div className={diffusionStyles.imageInfoValue}>
                    {imageInfo.generationTime}
                  </div>
                </div>
                <div className={diffusionStyles.imageInfoCard}>
                  <div className={diffusionStyles.imageInfoLabel}>
                    Model Version
                  </div>
                  <div className={diffusionStyles.imageInfoValue}>
                    {imageInfo.modelVersion}
                  </div>
                </div>
                <div className={diffusionStyles.imageInfoCard}>
                  <div className={diffusionStyles.imageInfoLabel}>
                    Resolution
                  </div>
                  <div className={diffusionStyles.imageInfoValue}>
                    {imageInfo.resolution}
                  </div>
                </div>
                <div className={diffusionStyles.imageInfoCard}>
                  <div className={diffusionStyles.imageInfoLabel}>Seed</div>
                  <div className={diffusionStyles.imageInfoValue}>
                    {imageInfo.seed}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {generatedImage && (
              <div className={diffusionStyles.actionButtonsGrid}>
                <button className={diffusionStyles.actionButton}>
                  <span className={diffusionStyles.buttonIcon}>💾</span>
                  Save Image
                </button>
                <button
                  onClick={handleGenerate}
                  className={diffusionStyles.actionButton}
                >
                  <span className={diffusionStyles.buttonIcon}>🔄</span>
                  Regenerate
                </button>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>

      <style jsx>{diffusionStyles.sliderStyles}</style>
    </div>
  );
};

export default DiffusionModel;

const diffusionStyles = {
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
