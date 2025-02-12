import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function AppRoot({ children }) {
  useEffect(() => {
    const resumeAudioContext = () => {
      // Your code to resume audio...
    };

    document.addEventListener("touchstart", resumeAudioContext, { passive: true });
    document.addEventListener("click", resumeAudioContext, { passive: true });

    return () => {
      document.removeEventListener("touchstart", resumeAudioContext);
      document.removeEventListener("click", resumeAudioContext);
    };
  }, []);

  return <BrowserRouter>{children}</BrowserRouter>;
}

export default AppRoot;