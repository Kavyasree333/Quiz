import { useEffect,useState } from "react";
// import {useSound} from '../hooks/useSound';
// import play from "../assets/play.wav";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
    const[question, setQuestion] = useState(null);
    const[selectedAnswer, setSelectedAnswer] =  useState(null);
    const[className, setClassName] =  useState(null);

    useEffect(()=>{
        console.log('Data in Trivia:', data); // Debugging log
        console.log('Current question number:', questionNumber); // Debugging log
        setQuestion(data[questionNumber-1])
    },[data, questionNumber]);
    
    const delay = (duration, callback)=>{
        setTimeout(()=>{
            callback();
        }, duration);
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const handleClick = (a) =>{
        setSelectedAnswer(a);
        setClassName("answer active");
        delay(3000,()=>{
            setClassName(a.correct? "answer correct" : "answer wrong")
            playSound(a.correct ? '/sounds/correct_answer.mp3' : '/sounds/wrong_answer.mp3');
        });
        delay(6000,()=>
        {
            if(a.correct){
                setQuestionNumber((prev) => prev + 1);
                setSelectedAnswer(null)
            }
            else{
                setStop(true);
            }
        });

    }
    return ( 
        <div className="trivia">
         <div className="question">{question?.question}</div>
            <div className="answers">
               {question?.answers.map((a) =>(
                <div className={selectedAnswer === a? className :"answer"} onClick={()=>{handleClick(a)}}>{a.text}</div>
               ))}
            </div>
        </div>
     );
}
 
export default Trivia;