
import { useState, useEffect } from 'react';
import CalculatorButtonPanel from './components/CalculatorButtonPanel';
import './assets/App.scss';

function App() {
  const [formula, setFormula] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [answer, setAnswer] = useState("");
  const [display, setDisplay] = useState("");
  const operators = /[-+*/]/g;

  useEffect(() => {
    setDisplay(firstValue);
  }, [firstValue]);

  useEffect(() => {
    setDisplay(secondValue);
  }, [secondValue]);

  useEffect(() => {
    setDisplay(currentOperator);
  }, [currentOperator]);

  useEffect(() => {
    if (firstValue !== "" && secondValue !== "") {
      console.log(firstValue, secondValue, currentOperator);
      setAnswer(handleCalculate(firstValue, secondValue, currentOperator));
    }
  }, [firstValue, secondValue, currentOperator]);

  function handleButtonClick(e) {
    const { value } = e.target;

    switch (value) {
      case "AC":
        setFormula("");
        setCurrentOperator("");
        setFirstValue("");
        setSecondValue("");
        setAnswer("");
        setDisplay("");
        break;
      case "=":
        handleEqualAction();
        break;
      default:
        if (formula === "0") {
          setFormula(zeroCheck(value, ""));
        } else {
          if (!(checkEndsWithDot(formula) && value === ".")) {
            setFormula(zeroCheck(value, formula));
          }
        }

        // If clicked any operator
        if (value.match(operators)) {
          if (currentOperator !== "") {
            setSecondValue("");
            if (!!checkEndsWithOperator(formula).match(operators)) {
              if (value === "-") {
                setSecondValue(`-${secondValue}`);
              } else {
                setFormula(formula.slice(0, -1) + value);
                setCurrentOperator(value);
              }
            } else {
              setFirstValue(answer.toString());
              setCurrentOperator(value);
            }
          } else {
            setCurrentOperator(value);
          }
        } else {
          // If clicked a number
          if (currentOperator !== "") {
            if (secondValue === "0") {
              setSecondValue("");
            } else {
              if (!(secondValue.includes(".") && value === ".")) {
                setSecondValue(zeroCheck(value, secondValue));
              }
            }
          } else {
            if (firstValue === "0") {
              setFirstValue("");
            } else {
              if (!(firstValue.includes(".") && value === ".")) {
                setFirstValue(zeroCheck(value, firstValue));
              }
            }
          }
        }

        break;
    }
  }

  // Operator Functions
  function handleEqualAction() {
    setDisplay(answer);
  }

  function checkEndsWithDot(str) {
    return str.endsWith(".");
  }

  function checkEndsWithOperator(str) {
    return str[str.length - 1];
  }

  function zeroCheck(value, currentValue) {
    if (value === "0" && (currentValue === "" || currentValue === "0")) {
      return "0";
    } else {
      return currentValue + value;
    }
  }

  function handleCalculate(a, b, operator) {
    switch (operator) {
      case "+":
        return parseFloat(a) + parseFloat(b);
      case "-":
        return parseFloat(a) - parseFloat(b);
      case "*":
        return parseFloat(a) * parseFloat(b);
      case "/":
        return parseFloat(a) / parseFloat(b);
    }
  }

  return (
    <>
      <div className="calculator">
        <span className="calculator--formula">{formula}</span>
        <span id="display" className="calculator--answer">
          {display !== "" ? display : "0"}
        </span>
        <CalculatorButtonPanel handleButtonClick={handleButtonClick} />
      </div>
    </>
  )
}

export default App;
