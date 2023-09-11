import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";

function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");

  // Input handler
  const handleInput = (event) => {
    if (answerValue === "Invalid Input!!") return;
    let val = event.target.innerText;

    if (val === "x2") val = "^2";
    else if (val === "x3") val = "^3";
    else if (val === "3√") val = "^(1÷3)";
    else if (val === "log") val = "log(";

    let str = inputValue + val;
    if (str.length > 14) return;

    if (answerValue !== "") {
      setInputValue(answerValue + val);
      setAnswerValue("");
    } else setInputValue(str);
  };

  // Clear screen
  const clearInput = () => {
    setInputValue("");
    setAnswerValue("");
  };

  // Check if brackets are balanced or not
  const checkBalancedBrackets = (expr) => {
    let stack = [];
    for (let i = 0; i < expr.length; i++) {
      let x = expr[i];
      if (x === "(") {
        stack.push(x);
        continue;
      }

      if (x === ")") {
        if (stack.length === 0) return false;
        else stack.pop();
      }
    }
    return stack.length === 0;
  };

  // Calculate final answer
  const calculateAnswer = () => {
    if (inputValue === "") return;
    let result = 0;
    let finalExpression = inputValue;
    finalExpression = finalExpression.replaceAll("x", "*");
    finalExpression = finalExpression.replaceAll("÷", "/");

    // Evaluate square root
    let sqrtNumbers = inputValue.match(/√[0-9]+/gi);
    if (sqrtNumbers !== null) {
      let evalSqrt = inputValue;
      for (let i = 0; i < sqrtNumbers.length; i++) {
        evalSqrt = evalSqrt.replace(
          sqrtNumbers[i],
          `sqrt(${sqrtNumbers[i].substring(1)})`
        );
      }
      finalExpression = evalSqrt;
    }

    try {
      // Check if brackets are balanced
      if (!checkBalancedBrackets(finalExpression)) {
        const errorMessage = { message: "Brackets are not balanced!" };
        throw errorMessage;
      }
      result = evaluate(finalExpression);
    } catch (error) {
      result =
        error.message === "Brackets are not balanced!"
          ? "Brackets are not balanced!"
          : "Invalid Input!!";
    }
    isNaN(result) ? setAnswerValue(result) : setAnswerValue(round(result, 3));
  };

  // Remove last character
  const backspace = () => {
    if (answerValue !== "") {
      setInputValue(answerValue.toString().slice(0, -1));
      setAnswerValue("");
    } else setInputValue((prev) => prev.slice(0, -1));
  };

  // Change prefix of expression
  const changePrefix = () => {
    if (answerValue === "Invalid Input!!") return;
    else if (answerValue !== "") {
      let ans = answerValue.toString();
      if (ans.charAt(0) === "-") {
        let plus = "+";
        setInputValue(plus.concat(ans.slice(1, ans.length)));
      } else if (ans.charAt(0) === "+") {
        let minus = "-";
        setInputValue(minus.concat(ans.slice(1, ans.length)));
      } else {
        let minus = "-";
        setInputValue(minus.concat(ans));
      }
      setAnswerValue("");
    } else {
      if (inputValue.charAt(0) === "-") {
        let plus = "+";
        setInputValue((prev) => plus.concat(prev.slice(1, prev.length)));
      } else if (inputValue.charAt(0) === "+") {
        let minus = "-";
        setInputValue((prev) => minus.concat(prev.slice(1, prev.length)));
      } else {
        let minus = "-";
        setInputValue((prev) => minus.concat(prev));
      }
    }
  };

  return (
    <div className="container">
      <div className="main">
        <Display
          input={inputValue}
          setInput={setInputValue}
          answer={answerValue}
        />
        <Buttons
          inputHandler={handleInput}
          clearInput={clearInput}
          backspace={backspace}
          changePlusMinus={changePrefix}
          calculateAns={calculateAnswer}
        />
      </div>
    </div>
  );
}

export default Calculator;
