import React, { useState, useEffect, useRef } from "react";
import "../styles/Formulas.css";
import "../styles/Quiz.css";
import axios from "axios";
import icons from "../JsonFiles/icons.json";

const closeIcon = icons.icons[6].src;

const Quiz = ({ onClick }) => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [mark, setMark] = useState(0);
  const [result, setResult] = useState(false);
  const [data, setData] = useState([]);
  const [fileData, setFileData] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/readFile")
      .then((res) => {
        console.log("Response:", res.data);
        setFileData(res.data.text);
        setData(res.data.answers);
        setQuestion(res.data.answers[index]);
      })
      .catch((err) => console.log(err));
  }, [index]);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
        setMark((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setMark(0);
    setLock(false);
    setResult(false);
  };

  const finishTask = () => {
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const currentUser = username.id;
    axios
      .post("http://localhost:3001/addMarks", { username: currentUser, mark })
      .then((response) => {
        if (
          response.data.status === "created" ||
          response.data.status === "exist"
        ) {
          alert("Mark has been added successfully");
        } else {
          alert("Mark hasn't been saved");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    if (minutes === 5 && seconds === 0) {
      clearInterval(timer);
      alert("Time is gone!:(");
      finishTask();
    }
    return () => clearInterval(timer);
  });

  const handleStop = () => {
    clearInterval(timer);
  };

  return (
    <div>
      <div className="quiz-container">
        <h1>Task 1</h1>
        <img className="close-icon" src={closeIcon} onClick={onClick} />
        {result ? (
          <>
            <h2>
              Your scored {score} out of {data.length}
            </h2>
            <button onClick={reset}>Reset</button>
            <button onClick={finishTask}>Finish</button>
          </>
        ) : (
          <>
            <p style={{ textAlign: "justify" }}>{fileData}</p>
            <ul>
              {question && (
                <>
                  <li
                    ref={Option1}
                    onClick={(e) => {
                      checkAns(e, 1);
                    }}
                  >
                    {question.option1}
                  </li>
                  <li
                    ref={Option2}
                    onClick={(e) => {
                      checkAns(e, 2);
                    }}
                  >
                    {question.option2}
                  </li>
                  <li
                    ref={Option3}
                    onClick={(e) => {
                      checkAns(e, 3);
                    }}
                  >
                    {question.option3}
                  </li>
                  <li
                    ref={Option4}
                    onClick={(e) => {
                      checkAns(e, 4);
                    }}
                  >
                    {question.option4}
                  </li>
                </>
              )}
            </ul>
            <div className="timer">
              <div className="timer-container">
                <div className="timer-box">
                  <h1>
                    Timer: {minutes < 10 ? "0" + minutes : minutes}:
                    {seconds < 10 ? "0" + seconds : seconds}
                  </h1>
                  <div className="timer-button">
                    <button className="stop" onClick={handleStop}>
                      Stop
                    </button>
                    <button onClick={next}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div id="mark">
          <p>
            Task number: {index + 1} of {data.length}
          </p>
          <p>Your mark is: {mark}</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
