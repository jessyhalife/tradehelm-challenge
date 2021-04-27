import React from "react";
import {v4 as uuidv4} from "uuid";

import {Item} from "../types";

function useLocalStorage() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<"loading" | "done">("loading");
  const [initial, setInitial] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const data = window.localStorage.getItem("spmkt_items");

      if (data) {
        setItems((JSON.parse(data) || []) as Item[]);
      }
      setStatus("done");
      setInitial(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    if (!initial) {
      window.localStorage.setItem("spmkt_items", JSON.stringify(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function deleteItem(uid: Item["uid"]): void {
    if (items.find((x) => x.uid === uid)) {
      setItems((items) => items.filter((x) => x.uid !== uid));
    }
  }

  function saveItem(description: string): void {
    const uid = uuidv4();

    setStatus("loading");
    setTimeout(() => {
      setItems((items) => items.concat({description, uid}));

      setStatus("done");
    }, 500);
  }

  return {status, items, saveItem, deleteItem};
}

export default useLocalStorage;
