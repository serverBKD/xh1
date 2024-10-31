import { app, upload } from "./app.js"
import { extname, join, dirname } from "path"
import { rename } from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.post("/", upload.array("images", 10), (req, res) => {
  const { label } = req.body

  if (req.files.length > 6) {
    console.log(req.files)

    return res.status(400).json({ error: "Debes subir hasta 6 imágenes." })
  }

  req.files.forEach((file, index) => {
    const Name = file.originalname.split(".")
    const ext = extname(file.originalname)
    const newFilename = `${label}_00${index + 1}__${file.size}_${Name[0]}${ext}`
    const newPath = join(__dirname, "uploads", newFilename)

    rename(file.path, newPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al renombrar el archivo." })
      }
    })
  })

  res.json({ message: "Imágenes subidas y renombradas exitosamente." })
})
