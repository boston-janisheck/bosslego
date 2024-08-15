import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

const app = express();
const apiKey = process.env.API_KEY;
const userHash = process.env.USER_HASH;
const port = process.env.PORT || 5001; // Default to 5001 if PORT is not set

app.use(cors()); // Enable CORS
app.use(express.json());

app.get("/getSets", async (req, res) => {
  try {
    const response = await fetch(
      `https://brickset.com/api/v3.asmx/getSets?apiKey=${apiKey}&userHash=${userHash}&params={"owned":1,"orderBy":"YearFrom"}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.status === "success") {
      res.json(data);
    } else {
      res
        .status(400)
        .json({ error: data.message || "Error fetching LEGO sets" });
    }
  } catch (error) {
    console.error("Error fetching LEGO sets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
