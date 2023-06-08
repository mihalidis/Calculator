import numPad from "../constants/numPad";

function CalculatorButtonPanel({ handleButtonClick }) {
  return (
    <div>
      {numPad.map((pad) => {
        return (
          <button
            onClick={handleButtonClick}
            style={pad.style}
            id={pad.id}
            key={pad.id}
            value={pad.value}
          >
            {pad.value}
          </button>
        );
      })}
    </div>
  );
}

export default CalculatorButtonPanel;