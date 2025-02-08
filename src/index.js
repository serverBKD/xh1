import { app } from "./app.js"
import { upload, desktopPath } from "./lib/multer.config.js"
import { extname, join } from "path"
import { rename, existsSync, mkdirSync, appendFileSync } from "fs"
// import { fileURLToPath } from "url"

//. const __filename = fileURLToPath(import.meta.url)
//. const __dirname = dirname(__filename)

// console.log(desktopPath)

app.post("/", upload.array("images", 1000), (req, res) => {
  const { label } = req.body
  const userAgent = req.headers["user-agent"]
  console.log("User Agent:", userAgent)

  if (req.files.length > 1000) {
    console.log("Puedes subir hasta 1000 imágenes")
    return res.json({ error: "Puedes subir hasta 1000 imágenes" })
  }

  const Fecha = new Date().toDateString().split(" ")
  const newFecha = Fecha[2] + Fecha[1] + Fecha[3]

  let counter = 0

  try {
    req.files.forEach((file, index) => {
      const Name = file.originalname.split(".")
      const ext = extname(file.originalname)
      const newFilename = `${label}-${index + 1}${file.size}-${newFecha}-xh1-${Name[0]}${ext}`
      const parentPath = join(desktopPath, label)
      const newPath = join(parentPath, newFilename)

      //! Log Entry
      const logEntry = `${new Date().toISOString()} - Original Name: ${file.originalname}, Size: ${file.size} bytes\n`
      const logPath = join(desktopPath, "upload_log.txt")
      appendFileSync(logPath, logEntry)

      if (!existsSync(parentPath)) {
        mkdirSync(parentPath, { recursive: true })
      }

      rename(file.path, newPath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al renombrar el archivo" })
        }
        counter++
      })
      if (counter === req.files.length) {
        // Enviar la respuesta después de que Multer haya procesado todas las imágenes
        return res.json({
          message: "Imágenes subidas y procesadas correctamente",
        })
      }
      // res.json({ message: "Imágenes subidas" })
    })
  } catch (error) {
    console.error(error)
  }
})
