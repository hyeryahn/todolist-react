import { useEffect, useState } from "react";

import "./App.css";
import { List } from "./component/List";

function App() {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [countChecked, setCountChecked] = useState(
    JSON.parse(localStorage.getItem("count")) || 0
  );
  const [percentage, setPercentage] = useState(
    (countChecked / list.length) * 100 || 0
  );

  const [input, setInput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("list")) {
      setList(JSON.parse(localStorage.getItem("list")));
    } else {
      setList([]);
      localStorage.setItem("list", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("count")) {
      setCountChecked(JSON.parse(localStorage.getItem("count")));
      setPercentage((countChecked / list.length) * 100);
    } else {
      setCountChecked(0);
      localStorage.setItem("count", JSON.stringify(0));
    }
  }, [countChecked, list]);

  function clearAll() {
    localStorage.clear();
    setList([]);
    localStorage.setItem("list", JSON.stringify([]));
    setCountChecked(0);
  }

  function onKeyDown(e) {
    const randomIndex = Math.floor(Math.random() * 100000);
    const newList = {
      id: randomIndex,
      content: e.target.value,
      checked: false,
    };
    if (e.keyCode === 13) {
      setInput("");
      if (localStorage.getItem("list")) {
        let storage = JSON.parse(localStorage.getItem("list"));
        storage.push(newList);
        localStorage.setItem("list", JSON.stringify(storage));
        setList(storage);
      } else {
        localStorage.setItem("list", JSON.stringify([newList]));
        setList(newList);
      }
    }
  }

  function handleClick(e) {
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">TODO LIST</header>
      <main className="App-main">
        <div className="input-container">
          <input
            type="text"
            id="todo-input"
            onKeyDown={onKeyDown}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div id="add-button" className="white" onClick={handleClick}>
            +
          </div>
        </div>
        <div className="button-container">
          <div
            className="countbox"
            style={
              list.length > 0
                ? {
                    background: `linear-gradient(to right, yellow, yellow ${percentage}%, white ${percentage}%, white)`,
                  }
                : { backgroundColor: "white" }
            }
          >
            <span>
              {countChecked} / {list.length} Completed
            </span>
          </div>
          <div className="clearAll white" onClick={clearAll}>
            Clear All
          </div>
        </div>
        <ul className="list-container">
          {list &&
            list.map((item, index) => (
              <List
                item={item}
                index={index}
                list={list}
                setList={setList}
                setCountChecked={setCountChecked}
              />
            ))}
        </ul>
      </main>
      <footer className="App-footer">
        <span className="footer-text" id="versionName">
          TodoList React ver.
        </span>
        <span className="footer-text white">2021.11.4 - 2021.11.</span>
      </footer>
    </div>
  );
}

export default App;
