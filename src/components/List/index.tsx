import React from "react";
import {FiTrash, FiTrash2} from "react-icons/fi";

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
              <FiTrash2 size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
