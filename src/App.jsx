import React, {useState, useEffect, useMemo} from 'react';
import './app.css';
import Trivia from './components/Trivia';
import Timer from './components/Timer';
function App() {
  const[questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const data = [
    {
      id:1, 
      question: "AA ante??",
      answers:[
        {
          text:"AlluArjun",
          correct: false,
        },
        {
          text:"AnnaAkkalu",
          correct: true,
        },
        {
          text:"AkhilAkkineni",
          correct: false,
        },
        {
          text:"None",
          correct: false,
        }
      ]
    },
    {
      id:2, 
      question: "TT ante??",
      answers:[
        {
          text:"ToxicTrio",
          correct: true,
        },
        {
          text:"TripleTrouble",
          correct: false,
        },
        {
          text:"Above2",
          correct: false,
        },
        {
          text:"None",
          correct: false,
        }
      ]
    }
  ]
  const moneyPyramid = useMemo(()=>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 500" },
      { id: 5, amount: "$ 1.000" },
      { id: 6, amount: "$ 2.000" },
      { id: 7, amount: "$ 4.000" },
      { id: 8, amount: "$ 8.000" },
      { id: 9, amount: "$ 16.000" },
      { id: 10, amount: "$ 32.000" },
      { id: 11, amount: "$ 64.000" },
      { id: 12, amount: "$ 125.000" },
      { id: 13, amount: "$ 250.000" },
      { id: 14, amount: "$ 500.000" },
      { id: 15, amount: "$ 1.000.000" },
    ].reverse() ,[]);
    useEffect(()=>{
      questionNumber > 1 && setEarned(moneyPyramid.find((m)=> m.id === questionNumber - 1).amount)
    },[moneyPyramid, questionNumber]);

    return (
    <div className="app">
      <div className="main">
        {stop?<h1 className="endText">You earned:{earned}</h1>:
        (
          <>
          <div className="top">
            <div className="timer">
              <Timer setStop={setStop} questionNumber={questionNumber}/>
            </div>
          </div>
          
          <div className="bottom">
            <Trivia 
              data={data} 
              setStop={setStop}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}/>
        </div></>
      )}
      </div>

      <div className="pyramid">
        <ul className="moneylist">
          {moneyPyramid.map((m) => (
            <li className={questionNumber === m.id?"mlitem active" : "mlitem"}>
              <span className='mlinum'>{m.id}</span>
              <span className='mlimon'>{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
