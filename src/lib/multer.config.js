import multer from "multer"
import path from "path"
import os from "os"

// Ruta al escritorio del usuario .C:\Users\serve\OneDrive\Escritorio
export const desktopPath = path.join(
  os.homedir(),
  "OneDrive",
  "Escritorio",
  "uploads"
)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, desktopPath) // Guardar en el escritorio
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + file.originalname)
  },
})

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000, // 100MB
  },
})
