import express from "express"
import multer from "multer"
import { extname, join } from "path"
import { rename } from "fs"

const app = express()
const upload = multer({ dest: "uploads/" })

app.post("/upload", upload.array("images", 3), (req, res) => {
  const { label } = req.body

  if (req.files.length > 3) {
    return res.status(400).json({ error: "Debes subir hasta 3 imágenes." })
  }

  req.files.forEach((file, index) => {
    const ext = extname(file.originalname)
    const newFilename = `${label}_${index + 1}${ext}`
    const newPath = join(__dirname, "uploads", newFilename)

    rename(file.path, newPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al renombrar el archivo." })
      }
    })
  })

  res.json({ message: "Imágenes subidas y renombradas exitosamente." })
})

app.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000")
})
