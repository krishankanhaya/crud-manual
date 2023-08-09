const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { router } = require("./routes/user-routes");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);


mongoose
  .connect(
    `mongodb+srv://krishankanhaya:krishankanhaya@ecom.yo4ikvv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Database is connected and. App is listening on 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
