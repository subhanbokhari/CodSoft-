import React from "react";
import "./styles/Display.css";

const Display = ({ input, setInput, answer }) => {
  const handleInputChange = (e) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  return (
    <div className="display">
      {answer === "" ? (
        <input
          type="text"
          name="input"
          className="input"
          style={{ padding: "29px" }}
          value={input}
          placeholder="0"
          maxLength={12}
          onChange={handleInputChange}
          autoComplete="off"
        />
      ) : (
        <>
          <input
            type="text"
            name="value"
            className="value input"
            value={input}
            disabled
          />
          <input
            type="text"
            name="answer"
            className="answer input"
            value={answer}
            disabled
          />
        </>
      )}
    </div>
  );
};

export default Display;
