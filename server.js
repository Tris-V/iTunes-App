import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import path from "path";
import routes from "./routes/index.js";
import helmet from "helmet";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(helmet());

// Routes
app.use("/api", routes);

// Search API, get term and media type from URL
app.get(`/search`, (req, res) => {
  const term = req.query.term;
  const media = req.query.media;

  // Retch request using the term and media type specified by user
  fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`)
    .then((result) => result.json())
    .then((response) => {
      // Send response if the request was successful
      res.send({
        message: "Search was successful",
        response,
      });
    })
    .catch((error) => {
      // If there is an error send error message
      res.send({
        message: "There seems to be an error",
      });
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Port listener
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;

/* https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1
   https://www.simplilearn.com/tutorials/express-js-tutorial/about-express-js-middleware
   https://medium.com/@marwan.zaarab/deploying-a-react-app-with-multiple-routes-using-express-static-files-e3373c53fe94 
   https://expressjs.com/en/resources/middleware/cors.html */
