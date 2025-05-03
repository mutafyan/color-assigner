import { useEffect, useState } from "react";
import "./App.css";

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
  }, []);
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
            height: "10%",
            width: "10%",
            backgroundColor: response.color,
          }}
        >
          {response.color}
        </div>
      )}
    </div>
  );
}

export default App;
