import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: debe coincidir con el nombre del repositorio para que el despliegue
// en GitHub Pages https://github.com/NicolePlaza/Exp3S8FrontendI.git encuentre
// correctamente los archivos JS, CSS, el JSON y las imágenes.
// En desarrollo local Vite ignora esta ruta y sirve desde "/".
export default defineConfig({
  plugins: [react()],
  base: '/Exp3S8FrontendI/',
})
