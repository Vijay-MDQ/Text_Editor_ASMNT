export const UPDATE_TEXT = "UPDATE_TEXT";
export const UNDO = "UNDO";
export const REDO = "REDO";

export const updateText = (text: string, word: string) => ({
  type: UPDATE_TEXT,
  text,
  word,
});
export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
