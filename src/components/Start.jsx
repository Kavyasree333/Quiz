import { useRef } from "react";
import './start.css';

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <div className="startContainer">
        <h1 className="startTitle">Welcome to the Quiz</h1>
        <input
          className="startInput"
          placeholder="Enter your name"
          ref={inputRef}
        />
        <button className="startButton" onClick={handleClick}>
          Start
        </button>
      </div>
    </div>
  );
}
