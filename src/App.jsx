import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import './app.css';
import Trivia from './components/Trivia';
import Start from "./components/Start";
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null); // Added username state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/questions');
        console.log('Fetched questions:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const moneyPyramid = useMemo(() =>
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
    ].reverse(), []);

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">{username} earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                  <ProgressBar questionNumber={questionNumber} totalQuestions={data.length} /> {/* Add ProgressBar */}
                </div>
                <div className="bottom">
                  {data.length > 0 && (
                    <Trivia
                      data={data}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneylist">
              {moneyPyramid.map((m) => (
                <li key={m.id} className={questionNumber === m.id ? "mlitem active" : "mlitem"}>
                  <span className='mlinum'>{m.id}</span>
                  <span className='mlimon'>{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;