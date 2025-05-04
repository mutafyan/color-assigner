import { useEffect, useState } from "react";
import "./styles/App.css";
import ColorGrid from "./components/ColorGrid";
import { getAssignedColor, getAvailableColors } from "./api/colorApi";

function App() {
  const [name, setName] = useState("");
  const [assignedColor, setAssignedColor] = useState(null);
  const [colorList, setColorList] = useState([]);
  const [loadingColors, setLoadingColors] = useState(true);
  const [isAssigningColor, setIsAssigningColor] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchColors = async () => {
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

    if (!assignedColor) {
      fetchColors();
    }
  }, [assignedColor]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("colorData"));
      if (stored?.assignedColor && stored?.name) {
        setAssignedColor(stored.assignedColor);
        setName(stored.name);
        setMessage(
          `Welcome back, ${stored.name}! You were assigned the color "${stored.assignedColor.color}".`
        );
      }
    } catch {
      console.log("Invalid localStorage format");
    }
  }, []);

  useEffect(() => {
    if (assignedColor && name) {
      localStorage.setItem(
        "colorData",
        JSON.stringify({ name, assignedColor })
      );
    }
  }, [assignedColor, name]);

  const handleNameInput = (e) => setName(e.target.value);

  const getColor = async () => {
    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    setIsAssigningColor(true);
    setMessage("");

    try {
      const res = await getAssignedColor(name);
      if (res?.color && res?.hex) {
        setAssignedColor(res);
        setMessage(`${name}, your assigned color is "${res.color}".`);
      } else {
        setMessage("Could not assign color. Please try again.");
      }
    } catch (err) {
      console.error("Error assigning color", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsAssigningColor(false);
    }
  };

  return (
    <div className="wrapper">
      <h1>Color Assigner</h1>

      {!assignedColor && (
        <div className="inputBlock">
          <input
            placeholder="Enter your name..."
            value={name}
            onChange={handleNameInput}
            className="input"
            disabled={isAssigningColor}
          />
          <button
            onClick={getColor}
            className="button"
            disabled={isAssigningColor}
            style={{backgroundColor: isAssigningColor ? 'grey' : '#4caf50'}}
          >
            {isAssigningColor ? "Assigning..." : "Submit"}
          </button>
        </div>
      )}

      {message && <p className="message">{message}</p>}

      {assignedColor?.hex && (
        <div className="resultBoxWrapper">
          <div
            className="resultBox"
            style={{ backgroundColor: assignedColor.hex }}
            title={assignedColor.color}
          />
        </div>
      )}

      {!assignedColor && (
        <>
          <h2>Available Colors</h2>
          {loadingColors ? (
            <p>Loading colors...</p>
          ) : (
            <ColorGrid colors={colorList} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
