import React, { useState } from "react";
import { diffusionStyles } from "../styles/DiffusionStyles";

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
        {/* Header */}
        {shouldGoToMainPage ? (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">←</span>
            Back to Main
          </button>
        ) : null}
        <div className={diffusionStyles.headerSection}>
          <h1 className={diffusionStyles.title}>AI Image Generator</h1>
          <p className={diffusionStyles.subtitle}>
            Generate high-quality images from different classes using advanced
            diffusion models
          </p>
        </div>

        {/* Model Info */}
        <div className={diffusionStyles.modelInfoSection}>
          <h2 className={diffusionStyles.modelInfoTitle}>
            <span className={diffusionStyles.modelInfoIcon}>🎨</span>
            Model Information
          </h2>
          <p className={diffusionStyles.modelInfoText}>
            This demo showcases a state-of-the-art diffusion model capable of
            generating high-quality images across multiple categories. The model
            uses a U-Net architecture with attention mechanisms, trained on a
            diverse dataset of 50,000+ images. Generate time: ~30 seconds per
            image.
          </p>
        </div>

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

        {/* Footer */}
        <div className={diffusionStyles.footer}>
          <p>
            ⚡ Powered by PyTorch & Diffusers • Model Version 2.1 • Last
            Updated: March 2024
          </p>
        </div>
      </div>

      <style jsx>{diffusionStyles.sliderStyles}</style>
    </div>
  );
};

export default DiffusionModel;
