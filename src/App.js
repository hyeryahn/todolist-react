import { useEffect, useState } from "react";
import "./App.css";
import "./input.css";
// import { Input } from "./components/Input";
// import { Lists } from "./components/Lists";

function App() {
  export function Input({ lists, setLists, countChecked, setCountChecked }) {
    const [input, setInput] = useState("");

    function onKeyDown(e) {
      const randomIndex = Math.floor(Math.random() * 100000);
      const list = { id: randomIndex, content: e.target.value, checked: false };
      if (e.keyCode === 13) {
        setInput("");
        if (localStorage.getItem("lists")) {
          setLists(JSON.parse(localStorage.getItem("lists")));
          setLists((current) => [...current, list]);
        } else {
          setLists(list);
        }
      }
    }
    useEffect(() => {
      lists.forEach(
        (item) => item.checked === true && setCountChecked(countChecked)
      );
      localStorage.setItem("lists", JSON.stringify(lists));
      localStorage.setItem("counts", JSON.stringify(countChecked));
    }, [lists, countChecked, setCountChecked]);

    function handleClick(e) {
      setInput(e.target.value);
    }

    return (
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
    );
  }

  export function Lists({ lists, setLists, countChecked, setCountChecked }) {
    function removeListItem(e) {
      const findIndex = lists.findIndex(
        (item) => item.id === Number(e.target.name)
      );
      const filteredList = lists.filter((list) => list !== lists[findIndex]);
      localStorage.setItem("lists", JSON.stringify(filteredList));
      setLists(JSON.parse(localStorage.getItem("lists")));
      setCountChecked(countChecked - 1);
    }

    function complete(e) {
      const findIndex = lists.findIndex(
        (li) => li.id === Number(e.target.name)
      );

      const item = document.getElementById(`list-${e.target.name}`);
      if (item.checked === false) {
        item.checked = true;
        lists[findIndex].checked = true;
        localStorage.setItem("lists", JSON.stringify(lists));
        setLists(JSON.parse(localStorage.getItem("lists")));
        setCountChecked(countChecked + 1);
      } else {
        item.checked = false;
        lists[findIndex].checked = false;
        localStorage.setItem("lists", JSON.stringify(lists));
        setLists(JSON.parse(localStorage.getItem("lists")));
        setCountChecked(countChecked - 1);
      }
    }

    return lists.map((list, index) => (
      <li
        className="list"
        checked={list.checked}
        id={`list-${list.id}`}
        key={index}
        style={
          list.checked === true
            ? {
                textDecoration: "line-through",
                opacity: "0.5",
              }
            : {
                textDecoration: "none",
                opacity: "1",
              }
        }
      >
        <input
          className="checkbox"
          name={list.id}
          type="checkbox"
          onClick={complete}
        />
        <textarea
          className="contentbox"
          type="text"
          rows={
            list.content.length <= 20
              ? "1"
              : Math.floor(list.content.length / 20) + 1
          }
          value={list.content}
          readOnly
        ></textarea>
        <img
          src="../images/pencil.png"
          alt="pencil-icon"
          className="pencil-icon"
          name={list.id}
        />
        <img
          src="../images/bin.png"
          alt="bin-icon"
          className="bin-icon"
          name={list.id}
          onClick={removeListItem}
        />
      </li>
    ));
  }

  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists")) || []
  );
  const [countChecked, setCountChecked] = useState(
    JSON.parse(localStorage.getItem("counts")) || 0
  );
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("lists")) {
      const list = JSON.parse(localStorage.getItem("lists"));
      setLists(list);
      setPercentage((countChecked / lists.length) * 100);
    }
  }, [countChecked, lists.length]);

  function clearAll() {
    localStorage.clear();
    setLists([]);
    setCountChecked(0);
  }

  return (
    <div className="App">
      <header className="App-header">TODO LIST</header>
      <main className="App-main">
        <Input
          lists={lists}
          setLists={setLists}
          countChecked={countChecked}
          setCountChecked={setCountChecked}
        />
        <div className="button-container">
          <div
            className="countbox"
            style={
              lists.length > 0
                ? {
                    background: `linear-gradient(to right, yellow, yellow ${percentage}%, white ${percentage}%, white)`,
                  }
                : { backgroundColor: "white" }
            }
          >
            <span>
              {countChecked} / {lists.length} Completed
            </span>
          </div>
          <div className="clearAll white" onClick={clearAll}>
            Clear All
          </div>
        </div>
        <ul className="list-container">
          {lists && (
            <Lists
              lists={lists}
              setLists={setLists}
              countChecked={countChecked}
              setCountChecked={setCountChecked}
            />
          )}
        </ul>
      </main>
      <footer className="App-footer">
        <span className="footer-text" id="versionName">
          TodoList React ver.
        </span>
        {/* <span className="footer-text white">start from 2021.11.4</span> */}
      </footer>
    </div>
  );
}

export default App;
