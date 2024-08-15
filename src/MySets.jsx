import { useEffect, useState } from "react";

const MySets = () => {
  const [sets, setSets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSets = async () => {
      const apiKey = "3-VIb8-Uz2c-cDjiK";
      const userHash = "bPQKzF7H5P";
      const params = JSON.stringify({ owned: 1, orderBy: "YearFrom" });

      const url = `https://brickset.com/api/v3.asmx/getSets?apiKey=${apiKey}&userHash=${userHash}&params=${params}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            apiKey,
            userHash,
            params,
          }),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const text = await response.text();
        const data = JSON.parse(text);

        if (data.sets) {
          setSets(data.sets);
        } else {
          throw new Error("Unexpected data structure: No 'sets' field found.");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      }
    };

    fetchSets();
  }, []);

  return (
    <div>
      <h1>My LEGO Sets</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {sets.map((set) => (
          <li key={set.setID}>{set.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MySets;
