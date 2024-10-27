import { useEffect, useState, useRef } from "react";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState(null);
    const backgroundMusicRef = useRef(new Audio('/sounds/buzzer_timer.mp3')); // Store audio in a ref

    useEffect(() => {
        console.log('Data in Trivia:', data); // Debugging log
        console.log('Current question number:', questionNumber); // Debugging log
        setQuestion(data[questionNumber - 1]);

        // Play background music on mount if not already playing
        const playBackgroundMusic = () => {
            if (backgroundMusicRef.current.paused) {
                backgroundMusicRef.current.loop = true; // Loop the music
                backgroundMusicRef.current.play().catch(err => console.error("Error playing background music:", err));
            }
        };

        playBackgroundMusic(); // Call function to play music

        // Cleanup function to stop music on unmount
        return () => {
            backgroundMusicRef.current.pause();
            backgroundMusicRef.current.currentTime = 0; // Reset to start
        };
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play().catch(err => console.error("Error playing sound:", err));
    };

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");

        // Stop background music when an answer is chosen
        if (!backgroundMusicRef.current.paused) {
            backgroundMusicRef.current.pause();
            backgroundMusicRef.current.currentTime = 0; // Reset to start
        }

        delay(3000, () => {
            setClassName(a.correct ? "answer correct" : "answer wrong");
            playSound(a.correct ? '/sounds/correct_answer.mp3' : '/sounds/wrong_answer.mp3');
        });

        delay(5000, () => {
            if (a.correct) {
                setQuestionNumber((prev) => prev + 1);
                setSelectedAnswer(null);
            } else {
                setStop(true);
            }
        });
    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div key={a.text} className={selectedAnswer === a ? className : "answer"} onClick={() => { handleClick(a); }}>
                        {a.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trivia;
