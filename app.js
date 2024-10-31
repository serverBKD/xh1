import express, { json } from "express"
import multer from "multer"
const PORT = 4000
const CWD = "http://localhost"
import cors from "cors"
const app = express()

var corsOptions = {
  origin: "*", //,"http://localhost:4000", //"http://localhost"
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//! Middlewares
app.use(cors(corsOptions))
app.use(json())
// Middleware para analizar application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
const upload = multer({ dest: "uploads/" })

//. Running APP
app.listen(PORT, () => {
  console.log(`Server is running at: ${CWD}:${PORT}`)
})

export { app, upload }
