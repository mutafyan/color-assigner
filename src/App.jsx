import { useEffect, useState } from "react";
import "./App.css";
import ColorGrid from "./components/ColorGrid";

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);
  const [colorList, setColorList] = useState(null);
  useEffect(() => {
    const getDisplayColors = async () => {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbxzfH1-z7yyRFjYp1Id13i8eaDwdZ6HEV_8DKf6BscI1Fgr-ztYA2HMK2Hit4-vpswJ2Q/exec?mode=availableColors`
      );
      const resJson = await res.json();
      setColorList(resJson.availableColors);
      return resJson;
    };
    getDisplayColors();
  }, [response]);
  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const getColor = async () => {
    const res = await fetch(
      `https://script.google.com/macros/s/AKfycbxzfH1-z7yyRFjYp1Id13i8eaDwdZ6HEV_8DKf6BscI1Fgr-ztYA2HMK2Hit4-vpswJ2Q/exec?name=${name}`
    );
    const resJson = await res.json();
    console.log(resJson);
    setResponse(resJson);
  };
  return (
    <div>
      <h1>Color Assigner</h1>
      {colorList && <ColorGrid colors={colorList} />}
      <label content="Name">
        <input
          placeholder="Enter your name..."
          value={name}
          onChange={handleNameInput}
        />
      </label>
      <button onClick={getColor}>Submit</button>
      {response && (
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            backgroundColor: response.color,
          }}
          title={response.color}
        ></div>
      )}
    </div>
  );
}

export default App;
