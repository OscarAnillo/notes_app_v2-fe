import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://notesappv2-api-production.up.railway.app/api/notes")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.log);
  }, [setData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please type your notes first!");
      return;
    }
    axios
      .post("https://notesappv2-api-production.up.railway.app/api/notes", {
        content: userInput,
      })
      .then((res) => {
        setData(data.concat(res.data));
        setUserInput("");
      })
      .catch(console.log);
  };

  const clickHandlerDelete = (id) => {
    axios.delete(
      `https://notesappv2-api-production.up.railway.app/api/notes/${id}`
    );
    const filteredData = data.filter((note) => note.id !== id);
    setData(filteredData);
  };

  return (
    <div className="App">
      <h1 className="title">Fullstack notes app</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add your notes"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {data.map((item) => (
        <div key={item.id} className="map-div">
          <div>
            <li>{item.content}</li>
            <p>{item.date}</p>
          </div>
          <button type="submit" onClick={() => clickHandlerDelete(item.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
