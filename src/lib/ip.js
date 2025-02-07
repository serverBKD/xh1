import os from "os"

// Obtén las interfaces de red
const networkInterfaces = os.networkInterfaces()

export default function MyIP() {
  // Itera sobre las interfaces de red para encontrar la IP privada
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName]

    for (const iface of interfaces) {
      // Filtra las direcciones IPv4 y que no sean direcciones internas (localhost)
      if (iface.family === "IPv4" && !iface.internal) {
        const MyIP = iface.address
        // console.log(`Tu IP privada es: ${MyIP}`)
        return MyIP
      }
    }
  }
}
