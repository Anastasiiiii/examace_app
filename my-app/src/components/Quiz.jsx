import React, { useState, useEffect, useRef } from "react";
import "../styles/Formulas.css";
import "../styles/Quiz.css";
import axios from "axios";
import { data } from "../elements/data";
import icons from "../icons.json";
import Timer from "./Timer";

const closeIcon = icons.icons[6].src;


const Quiz = ( { onClick } ) => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [mark, setMark] = useState(0);
  let [result, setResult] = useState(false);
  let [tasks, setTasks] = useState([])

  const[fileData, setFileData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3001/readFile')
    .then(fileData => setFileData(fileData.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/getTasks')
    .then(tasks => setTasks(tasks.data))
    .catch(err => console.log(err))
  }, [])
  

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
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
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
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
  }
  const finishTask = (mark) => {
    const currentTime = new Date().toISOString();
    const markInfo = { mark, date: currentTime };
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const currentUser = username.id
    if (onclick) {
    axios.post("http://localhost:3001/addMark", { currentUser, markInfo })
        .then(response => {
            if (response.data.status === "success") {
                alert("Mark has been added successfully");
            } else {
                alert("Mark hasn`t been saved")
            }
        })
        .catch(err => {
            console.error(err)
        })} else {

        }
  }

  return (
    <div>
    
    <div className="quiz-container">
    
      <h1>Task 1</h1>
      <img className="close-icon" src={closeIcon} onClick={onClick} />
      {result ? (
        <></>
      ) : (
        <>
          <p style={{textAlign: "justify"}}>
            {fileData}
          </p>
          <ul>
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
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            Your scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
      <div id="mark">Your mark is {mark}</div>
      <button onClick={finishTask()}>Finish</button>
    </div>
    <Timer />
    </div>
  );
};

export default Quiz;
