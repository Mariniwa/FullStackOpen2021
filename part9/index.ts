/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express = require("express");
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height) {
    return res.status(404).json({ error: "malformatted parameters" });
  } else {
    const response = String(bmiCalculator(Number(height), Number(weight)));
    const responseObject = {
      weight: weight,
      height: height,
      bmi: response,
    };
    return res.status(200).json(responseObject);
  }
});

app.post("/exercises", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  let dailyExercisesNaN = false;
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;
  if (!daily_exercises || !target) {
    return res.status(404).json({ error: "parameters missing" });
  }
  const targetNaN = isNaN(Number(target));
  for (let i = 0; i < daily_exercises.length; i++) {
    dailyExercisesNaN = isNaN(Number(daily_exercises[i]));
  } 
  if (targetNaN || dailyExercisesNaN) {
    return res.status(404).json({ error: "malformatted parameters" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(Number(target), daily_exercises);
    return res.status(200).json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
