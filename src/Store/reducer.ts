// src/reducer.ts
import { UPDATE_TEXT, UNDO, REDO } from "./actions";

interface TextState {
  past: string[]; // History of changes as words
  present: string; // Current state of the text
  future: string[]; // Redo stack
}

const initialState: TextState = {
  past: [],
  present: "",
  future: [],
};

const textReducer = (state = initialState, action: any): TextState => {
  const { past, present, future } = state;

  switch (action.type) {
    case UPDATE_TEXT:
      // Handle word-by-word update
      const words = action.text.split(" ");
      const lastWord = action.word;
      console.log(lastWord, "reucer lastWord");
      console.log(words, "reucer words");
      return {
        past: [...past, lastWord],
        present: words.join(" "),
        future: [],
      };
    case UNDO:
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      console.log(previous, "reucer previous");
      const newPresent = present.split(" ").slice(0, -1).join(" ");
      console.log(newPresent, "reucer newPresent");
      return {
        past: past.slice(0, -1),
        present: newPresent,
        future: [previous, ...future],
      };
    case REDO:
      if (future.length === 0) return state;
      const next = future[0];
      console.log(next, "reucer next");
      const newPresentRedo = present + " " + next;
      console.log(newPresentRedo, "reucer newPresentRedo");
      return {
        past: [...past, present.split(" ").pop() || ""],
        present: newPresentRedo,
        future: future.slice(1),
      };
    default:
      return state;
  }
};

export default textReducer;
