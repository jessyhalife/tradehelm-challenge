import React from "react";

import {Item} from "../../types";

import "./styles.scss";

interface Props {
  show: boolean;
  handleClose: () => void;
  saveHandler: (description: Item["description"]) => void;
}

const Modal: React.FC<Props> = ({saveHandler, show, handleClose}) => {
  const visibility = show ? "modal visible" : "modal hidden";
  const [input, setInput] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(document.createElement("input"));

  React.useEffect(() => {
    inputRef.current.focus();
  }, [show]);

  function close() {
    setInput("");
    handleClose();
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      save();
    }
  }
  function save() {
    saveHandler(input);
    close();
  }

  return (
    <div className={visibility}>
      <main>
        <button className="close" onClick={close}>
          Close X
        </button>
        <h2>Add new item</h2>
        <input
          ref={inputRef}
          placeholder="description"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="save" onClick={save}>
          Save
        </button>
      </main>
    </div>
  );
};

export default Modal;
