import * as React from "react";

import List from "../components/List";
import Modal from "../components/Modal";
import ToggleTheme from "../components/ToggleTheme";
import useLocalStorage from "../hooks/useLocalStorage";

import "./App.scss";

const icons = ["👋🏻", "👋", "👋🏼", "👋🏽", "👋🏾", "👋🏿"];
const App: React.FC = () => {
  const {status, items, saveItem, deleteItem} = useLocalStorage();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [icon, setIcon] = React.useState("👋🏻");

  React.useEffect(() => {
    const interval = setInterval(() => {
      const rnd = Math.floor(Math.random() * icons.length);

      setIcon(icons[rnd]);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`container`}>
      <div className="toggle-wrapper">
        <div className="toggle" />
      </div>
      <ToggleTheme />
      <header>
        <h1 className="mb-md">Hi! {icon}</h1>
        <h2 className="title mb-md">Supermarket list</h2>
      </header>

      <h3 className="mb-lg">
        {status === "loading" ? "Loading..." : <span>{items.length} items</span>}
      </h3>
      {items.length > 0 ? (
        <List deleteItem={deleteItem} items={items} />
      ) : (
        <div>
          <h3>Nothing...</h3>
        </div>
      )}

      <div className="btn-container">
        <button className="btn-add" tabIndex={1} onClick={() => setShowModal(true)}>
          Add
        </button>
      </div>
      <Modal handleClose={() => setShowModal(false)} saveHandler={saveItem} show={showModal} />
    </div>
  );
};

export default App;
