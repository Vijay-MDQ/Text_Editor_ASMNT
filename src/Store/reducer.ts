import { UPDATE_TEXT, UNDO, REDO } from "./actions";

interface TextState {
  past: string[];
  present: string;
  future: string[];
}

const initialState: TextState = {
  past: [],
  present: "",
  future: [],
};

const textReducer = (state = initialState, action: any): TextState => {
  const { past, present, future } = state;

  console.log(present, "present");
  console.log(future, "future");
  console.log(past, "past");

  switch (action.type) {
    case UPDATE_TEXT:
      const words = action.text.split(" ");
      if (words.length === 1) {
        return {
          past: [],
          present: action.text,
          future: [],
        };
      } else {
        return {
          past: [...past, words[words.length - 2]],
          present: action.text,
          future: [],
        };
      }

    case UNDO:
      if (past.length === 0) return state;
      const newPresent = present.split(" ").slice(0, -1).join(" ");
      const word = present.split(" ").pop();
      return {
        past: past.slice(0, -1),
        present: newPresent,
        future: word ? [word, ...future] : future,
      };
    case REDO:
      if (future.length === 0) return state;
      const next = future[0];
      const presentWords = present.split(" ");
      presentWords.push(next);
      return {
        past: [...past, next],
        present: presentWords.join(" "),
        future: future.slice(1),
      };
    default:
      return state;
  }
};

export default textReducer;
