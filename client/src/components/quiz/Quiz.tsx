import React, { useState, useRef, useEffect } from "react";
import ProctoringTracker from "./ProctoringTracker";
import './Quiz.css';
import { data } from "./assets/data";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  ans: number;
}

interface AnswerState {
  selectedOption: number | null;
  isCorrect: boolean;
}

function Quiz() {
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Question>(data[0]);
  const [lock, setLock] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<boolean>(false);
  const [fadeState, setFadeState] = useState<string>("question-transition");
  // Track user answers for each question
  const [userAnswers, setUserAnswers] = useState<AnswerState[]>(
    Array(data.length).fill({ selectedOption: null, isCorrect: false })
  );
  // Simple timer state
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  const option1 = useRef<HTMLLIElement | null>(null);
  const option2 = useRef<HTMLLIElement | null>(null);
  const option3 = useRef<HTMLLIElement | null>(null);
  const option4 = useRef<HTMLLIElement | null>(null);
  const option_array = [option1, option2, option3, option4];

  // Simple timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (!result) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [result]);

  // Format time as HH:MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  useEffect(() => {
    setQuestion(data[index]);
    
    // Apply previous answer classes when navigating between questions
    if (userAnswers[index].selectedOption !== null) {
      const selectedOption = userAnswers[index].selectedOption;
      
      option_array.forEach((option, i) => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong", "selected");
          
          if (i + 1 === selectedOption) {
            option.current.classList.add(userAnswers[index].isCorrect ? "correct" : "wrong");
            option.current.classList.add("selected");
          }
          
          if (!userAnswers[index].isCorrect && i + 1 === question.ans) {
            option.current.classList.add("correct");
          }
        }
      });
      
      setLock(true);
    } else {
      // Clear all classes when navigating to a fresh question
      option_array.forEach(option => {
        option.current?.classList.remove("correct", "wrong", "selected");
      });
      setLock(false);
    }
  }, [index, userAnswers]);

  const checkAns = (e: React.MouseEvent<HTMLLIElement>, ans: number) => {
    if (!lock) {
      const isCorrect = question.ans === ans;
      
      // Update user answers state
      const newUserAnswers = [...userAnswers];
      newUserAnswers[index] = { selectedOption: ans, isCorrect };
      setUserAnswers(newUserAnswers);
      
      // Update score if correct
      if (isCorrect) {
        setScore(prev => prev + 1);
        e.currentTarget.classList.add("correct");
      } else {
        e.currentTarget.classList.add("wrong");
        option_array[question.ans - 1].current?.classList.add("correct");
      }
      
      // Add selected class to track user's choice
      e.currentTarget.classList.add("selected");
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      // Add fade-out animation before changing question
      setFadeState("fade-out");
      setTimeout(() => {
        setIndex(prev => prev + 1);
        setFadeState("question-transition");
      }, 300);
    }
  };

  const prev = () => {
    if (index > 0) {
      setFadeState("fade-out");
      setTimeout(() => {
        setIndex(prev => prev - 1);
        setFadeState("question-transition");
      }, 300);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setElapsedTime(0);
    setUserAnswers(Array(data.length).fill({ selectedOption: null, isCorrect: false }));
    option_array.forEach(option => {
      option.current?.classList.remove("correct", "wrong", "selected");
    });
  };

  const quit = () => {
    window.location.href = "/"; // Redirect to home page
  };

  const calculatePercentage = () => {
    return Math.round((score / data.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 75) return "Good job!";
    if (percentage >= 60) return "Not bad!";
    return "Keep practicing!";
  };

  return (
    <div className="container">
      <ProctoringTracker /> {/* Ensure it renders */}
      
      {/* Simple Timer Display */}
      <div className="simple-timer">
        Time: {formatTime(elapsedTime)}
      </div>
      
      <h1> TEST AREA </h1>
      <hr />
      {!result ? (
        <>
          <div className={fadeState}>
            <h2>{index + 1}. {question.question}</h2>
            <ul>
              <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
              <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
              <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
              <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
            </ul>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((index + 1) / data.length) * 100}%` }}
            ></div>
          </div>
          <div className="button-group">
            <button onClick={prev} disabled={index === 0} className={index === 0 ? "disabled" : ""}>
              Previous
            </button>
            <button onClick={next}>Next</button>
          </div>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      ) : (
        <div className="result-container">
          <h2 className="result-title">Quiz Completed!</h2>
          <div className="time-result">Time taken: {formatTime(elapsedTime)}</div>
          <div className="score-card">
            <div className="score-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${calculatePercentage()}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{calculatePercentage()}%</text>
              </svg>
            </div>
            <div className="score-details">
              <p className="score-message">{getScoreMessage()}</p>
              <p className="score-text">You scored {score} out of {data.length}</p>
              <p className="score-breakdown">Correct answers: {score}</p>
              <p className="score-breakdown">Incorrect answers: {data.length - score}</p>
            </div>
          </div>
          <div className="result-buttons">
            <button onClick={reset} className="restart-btn">Restart Quiz</button>
            <button onClick={quit} className="quit-btn">Quit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;