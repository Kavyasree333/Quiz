import React from 'react';
import './progressBar.css'; // Create a CSS file for styling

const ProgressBar = ({ questionNumber, totalQuestions }) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;