import { useState, useEffect } from "react";

const MySets = () => {
  const [sets, setSets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch("http://localhost:5001/getSets");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === "success") {
          setSets(data.sets);
        } else {
          throw new Error(data.message || "Error fetching LEGO sets");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My LEGO Sets</h1>
      <ul>
        {sets.map((set) => (
          <li key={set.setID}>
            {set.name} - {set.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySets;
