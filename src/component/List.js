import { useState } from "react";
import "./List.css";

export function List({ item, index, list, setList, setCountChecked }) {
  const [readOnly, setReadOnly] = useState(true);
  const [content, setContent] = useState(item.content);

  const src = readOnly ? "../pencil.png" : "../check-icon.png";
  const listStyle = item.checked ? { opacity: "0.5" } : { opacity: "1" };
  const textStyle = item.checked
    ? { textDecoration: "line-through" }
    : { textDecoration: "none" };
  const imgStyle =
    item.checked === true ? { display: "none" } : { display: "block" };

  function removeListItem(e) {
    const findIndex = list.findIndex(
      (item) => item.id === Number(e.target.name)
    );
    const filteredList = list.filter((item) => item !== list[findIndex]);
    localStorage.setItem("list", JSON.stringify(filteredList));
    setList(JSON.parse(localStorage.getItem("list")));
    if (item.checked === true) {
      let newCount = Number(JSON.parse(localStorage.getItem("count")));
      newCount -= 1;
      localStorage.setItem("count", JSON.stringify(newCount));
      setCountChecked(newCount);
    }
  }

  function changeTextarea(e) {
    const findIndex = list.findIndex(
      (item) => item.id === Number(e.target.name)
    );
    let newList = list;
    newList[findIndex].content = content;
    localStorage.setItem("list", JSON.stringify(newList));
    setList(JSON.parse(localStorage.getItem("list")));
    if (readOnly === true) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
    }
  }

  function check(e) {
    const findIndex = list.findIndex(
      (item) => item.id === Number(e.target.name)
    );
    let newList = list;
    newList[findIndex].checked = e.target.checked;
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
    let newCount = Number(JSON.parse(localStorage.getItem("count")));
    e.target.checked === true ? (newCount += 1) : (newCount -= 1);
    localStorage.setItem("count", JSON.stringify(newCount));
    setCountChecked(newCount);
  }

  function onChangeHandler(e) {
    setContent(e.target.value);
  }

  return (
    <li className="list" id={`list-${list.id}`} key={index} style={listStyle}>
      <div className="content-container">
        <input
          className="checkbox"
          name={item.id}
          type="checkbox"
          checked={item.checked}
          onClick={check}
          readOnly
        />
        <textarea
          style={textStyle}
          className="contentbox"
          type="text"
          rows={
            content.length <= 20 ? "1" : Math.floor(content.length / 20) + 1
          }
          value={content}
          onChange={readOnly === false ? onChangeHandler : undefined}
          readOnly={readOnly}
        ></textarea>
      </div>
      <div className="img-container">
        <img
          src={src}
          alt="pencil-icon"
          className="pencil-icon"
          name={item.id}
          onClick={changeTextarea}
          style={imgStyle}
        />
        <img
          src="../bin.png"
          alt="bin-icon"
          className="bin-icon"
          name={item.id}
          onClick={removeListItem}
        />
      </div>
    </li>
  );
}
