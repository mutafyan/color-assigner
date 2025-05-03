import { useEffect, useState } from "react";
import "./styles/App.css";
import ColorGrid from "./components/ColorGrid";
import { getAssignedColor, getAvailableColors } from "./api/colorApi";

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);
  const [colorList, setColorList] = useState(null);
  const [loadingColors, setLoadingColors] = useState(true);
  const [assigningColor, setAssigningColor] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getDisplayColors = async () => {
      setLoadingColors(true);
      try {
        const data = await getAvailableColors();
        setColorList(data.availableColors || []);
      } catch (err) {
        console.error("Failed to fetch color list", err);
      } finally {
        setLoadingColors(false);
      }
    };
    getDisplayColors();
  }, [response]);

  const handleNameInput = (e) => setName(e.target.value);

  const getColor = async () => {
    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }
    setAssigningColor(true);
    setMessage("");
    try {
      const resJson = await getAssignedColor(name);
      setResponse(resJson);
      setMessage(`${name}, your assigned color is "${resJson.color}"`);
    } catch (err) {
      console.error("Error assigning color", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setAssigningColor(false);
    }
  };

  return (
    <div className="wrapper">
      <h1>Color Assigner</h1>

      <div className="inputBlock">
        <input
          placeholder="Enter your name..."
          value={name}
          onChange={handleNameInput}
          className="input"
        />
        <button onClick={getColor} className="button">
          {assigningColor ? "Assigning..." : "Submit"}
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {assigningColor && <p>Loading assigned color...</p>}

      {response?.color && (
        <div className="resultBoxWrapper">
          <div
            className="resultBox"
            style={{ backgroundColor: response.color }}
            title={response.color}
          />
        </div>
      )}

      <h2>Available Colors</h2>
      {loadingColors ? (
        response ? (
          <p>Updating colors...</p>
        ) : (
          <p>Loading colors...</p>
        )
      ) : (
        <ColorGrid colors={colorList} />
      )}
    </div>
  );
}

export default App;
