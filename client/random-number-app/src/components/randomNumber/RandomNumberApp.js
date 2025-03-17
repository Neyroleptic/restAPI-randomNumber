import { useState } from "react";
import styles from "./RandomNumberApp.module.css"; // Импортируем стили

export default function RandomNumberApp() {
  const [generated, setGenerated] = useState(null);
  const [retrieved, setRetrieved] = useState(null);
  const [retrieveId, setRetrieveId] = useState("");

  const generateNumber = async () => {
    const response = await fetch("http://localhost:5000/generate");
    const data = await response.json();
    console.log(data);
    setGenerated(data);
  };

  const retrieveNumber = async () => {
    if (!retrieveId) return;
    const response = await fetch(
      `http://localhost:5000/retrieve/${retrieveId}`
    );
    const data = await response.json();
    setRetrieved(data);
  };

  return (
    <div className={styles.container}>
      <button onClick={generateNumber}>Generate Number</button>
      {generated && (
        <div className={styles.resultBox}>
          <p>Generated ID: {generated.id}</p>
          <p>Generated Number: {generated.number}</p>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Enter ID to retrieve"
          value={retrieveId}
          onChange={(e) => setRetrieveId(e.target.value)}
        />
        <button onClick={retrieveNumber}>Retrieve Number</button>
      </div>
      {retrieved && (
        <div className={styles.resultBox}>
          <p>Retrieved ID: {retrieved.id}</p>
          <p>Retrieved Number: {retrieved.number}</p>
        </div>
      )}
    </div>
  );
}
