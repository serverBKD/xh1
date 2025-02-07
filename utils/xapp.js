import express from "express"
import multer from "multer"
import { extname, join } from "path"
import { rename, existsSync, mkdirSync } from "fs"

const app = express()
const upload = multer({ dest: "uploads/" })

app.post("/upload", upload.array("images", 6), (req, res) => {
  const { label } = req.body || "trifaxic-13"

  if (req.files.length > 6) {
    return res.status(500).json({ error: "Debes subir hasta 6 imágenes." })
  }

  req.files.forEach(async (file, index) => {
    const ext = extname(file.originalname)
    const newFilename = `${label}-${new Date().getTime()}-trifaxic-${index + 1}${ext}`
    const newPath = join(__dirname, "uploads", label, newFilename)

    if (!existsSync(newPath)) {
      mkdirSync(newPath, { recursive: true })
    }

    rename(file.path, newPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al renombrar el archivo." })
      }
    })
  })

  res.json({ message: "Imágenes subidas" })
})

app.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000")
})
