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

function Quiz() {
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Question>(data[0]);
  const [lock, setLock] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<boolean>(false);

  const option1 = useRef<HTMLLIElement | null>(null);
  const option2 = useRef<HTMLLIElement | null>(null);
  const option3 = useRef<HTMLLIElement | null>(null);
  const option4 = useRef<HTMLLIElement | null>(null);
  const option_array = [option1, option2, option3, option4];

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const checkAns = (e: React.MouseEvent<HTMLLIElement>, ans: number) => {
    if (!lock) {
      if (question.ans === ans) {
        e.currentTarget.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.currentTarget.classList.add("wrong");
        option_array[question.ans - 1].current?.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setLock(false);
      option_array.forEach((option) => {
        option.current?.classList.remove("wrong", "correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <ProctoringTracker /> {/* Ensure it renders */}
      <h1> TEST AREA </h1>
      <hr />
      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}> Next </button>
          <div className="index">{index + 1} of {data.length} questions </div>
        </>
      ) : (
        <>
          <h2>You scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
}

export default Quiz;
