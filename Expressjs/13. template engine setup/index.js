import express from "express";
import web from "./routes/web.js";
import { join } from "path";
const app = express();

app.set("view engine", "ejs");

// 4. Static Files
app.use(express.static(join(process.cwd(), "public")));

app.use("/", web);

app.listen(8000, () => console.log("Server Up!"));
