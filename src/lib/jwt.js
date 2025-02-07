/* eslint-disable no-unused-vars */
app.post("/", upload.array("images", 100), (req, res) => {
  const userAgent = req.headers["user-agent"]
  console.log("User Agent:", userAgent)

  // Resto de tu código
})

import { verify } from "jsonwebtoken"

app.post("/", upload.array("images", 100), (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = verify(token, "tu_clave_secreta")
  const clientId = decodedToken.userId

  console.log("Cliente ID:", clientId)

  // Resto de tu código
})

import cookieParser from "cookie-parser"
app.use(cookieParser())

app.post("/", upload.array("images", 100), (req, res) => {
  const clientId = req.cookies["clientId"]
  console.log("Cliente ID desde cookie:", clientId)

  // Resto de tu código
})
