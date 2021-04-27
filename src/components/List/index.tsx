import React from "react";

import {Item} from "../../types";
import "./styles.scss";
interface Props {
  items: Item[];
  deleteItem: (uid: Item["uid"]) => void;
}
const List: React.FC<Props> = ({items, deleteItem}) => {
  return (
    <div>
      <ul>
        {items.map((i, index) => (
          <li key={i.uid}>
            <span>{i.description}</span>
            <button tabIndex={index + 2} onClick={() => deleteItem(i.uid)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
