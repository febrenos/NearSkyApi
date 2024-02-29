// server.ts

import express from "express";
import exampleRoutes from "./routes/weatherRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/weather", exampleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/weather`);
});
