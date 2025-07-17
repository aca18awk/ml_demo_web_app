import { useState } from "react";
import "./App.css";
import ChooseModel from "./screens/ChooseModel";
import Classifier from "./screens/Classifier";
import Diffusion from "./screens/Diffusion";
import { MODEL_TYPE } from "./constants";

function App() {
  const [currentPage, setCurrentPage] = useState(MODEL_TYPE);

  const shouldGoToMainPage = MODEL_TYPE === "MULTIMODAL";

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleBackToMain = () => {
    setCurrentPage("MULTIMODAL");
  };

  // Render different components based on current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "CLASSIFIER":
        return (
          <Classifier
            onBack={handleBackToMain}
            shouldGoToMainPage={shouldGoToMainPage}
          />
        );
      case "DIFFUSION":
        return (
          <Diffusion
            onBack={handleBackToMain}
            shouldGoToMainPage={shouldGoToMainPage}
          />
        );
      default:
        return <ChooseModel onNavigate={handleNavigation} />;
    }
  };

  return renderCurrentPage();
}
export default App;
