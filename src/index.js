import { app, upload } from "./app.js"
import { extname, join, dirname } from "path"
import { rename, existsSync, mkdirSync } from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.post("/", upload.array("images", 1000), (req, res) => {
  const { label } = req.body
  const userAgent = req.headers["user-agent"]
  console.log("User Agent:", userAgent)

  if (req.files.length > 1000) {
    console.log("Puedes subir hasta 100 imágenes")
    return res.json({ error: "Puedes subir hasta 100 imágenes" })
  }

  const Fecha = new Date().toDateString().split(" ")
  const newFecha = Fecha[2] + Fecha[1] + Fecha[3]

  req.files.forEach((file, index) => {
    const Name = file.originalname.split(".")
    const ext = extname(file.originalname)
    const newFilename = `${label}-${index + 1}${file.size}-${newFecha}-xh1-${Name[0]}${ext}`
    const parentPath = join(__dirname, "uploads", label)
    const newPath = join(parentPath, newFilename)

    if (!existsSync(parentPath)) {
      mkdirSync(parentPath, { recursive: true })
    }

    rename(file.path, newPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al renombrar el archivo" })
      }
    })
  })

  res.json({ message: "Imágenes subidas" })
})
