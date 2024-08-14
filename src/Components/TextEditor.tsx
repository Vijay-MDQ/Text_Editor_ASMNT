import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateText, undo, redo } from "../Store/actions";

interface AppState {
  text: {
    past: string[];
    present: string;
    future: string[];
  };
}

const TextEditor: React.FC = () => {
  const text = useSelector((state: AppState) => state.text.present);
  const past = useSelector((state: AppState) => state.text.past);
  const future = useSelector((state: AppState) => state.text.future);
  const dispatch = useDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = e.target.value;
    const words = currentText.split(" ");
    const lastWord = words[words.length - 1];
    console.log(lastWord);
    dispatch(updateText(currentText, lastWord));
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "left",
        flexDirection: "column",
        display: "flex",
        gap: "10px",
      }}
    >
      <h1>Simple Text Editor</h1>
      <textarea
        value={text}
        rows={25}
        style={{ width: "100%", border: "1px solid silver" }}
        onChange={handleTextChange}
      />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: past.length === 0 ? "#616e80" : "red",
            cursor: "pointer",
            width: "15ch",
            color: "#fff",
          }}
          onClick={() => dispatch(undo())}
          disabled={past.length === 0}
        >
          Undo
        </button>
        <button
          style={{
            backgroundColor: future.length === 0 ? "#616e80" : "green",
            cursor: "pointer",
            color: "#fff",
            width: "15ch",
          }}
          onClick={() => dispatch(redo())}
          disabled={future.length === 0}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
