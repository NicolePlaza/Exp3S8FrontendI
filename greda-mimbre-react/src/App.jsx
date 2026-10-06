import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Catalogo from './components/Catalogo.jsx'
import Carrito from './components/Carrito.jsx'
import Toast from './components/Toast.jsx'

// Clave usada para guardar el carrito en el navegador (localStorage).
const CLAVE_CARRITO = 'greda-mimbre-carrito'

// Ruta base del proyecto (en GitHub Pages es "/greda-mimbre-react/").
// Se antepone a los recursos de /public para que funcionen en local y desplegado.
const BASE = import.meta.env.BASE_URL

function App() {
  // ---- ESTADOS (useState) ----
  // Catálogo de productos cargado dinámicamente.
  const [productos, setProductos] = useState([])
  // Estados de la carga de datos: permiten el renderizado condicional.
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Productos seleccionados en el carrito.
  // Se inicializa leyendo lo que haya guardado en localStorage (si existe).
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO)
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })

  // Estados de interacción de la interfaz.
  const [categoriaElegida, setCategoriaElegida] = useState('Todo')
  const [busqueda, setBusqueda] = useState('')
  const [carritoAbierto, setCarritoAbierto] = useState(false) // panel en móvil
  const [toast, setToast] = useState(null) // mensaje emergente (reemplaza alert)

  // ---- EFECTOS (useEffect) ----

  // 1) Carga de datos: simula traer los productos desde una fuente externa
  //    (archivo JSON) usando fetch dentro de useEffect al montar el componente.
  function obtenerProductos() {
    setCargando(true)
    setError(null)

    fetch(`${BASE}productos.json`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`)
        }
        return respuesta.json()
      })
      .then((datos) => {
        if (!Array.isArray(datos) || datos.length === 0) {
          throw new Error('El archivo de productos está vacío o es inválido.')
        }
        setProductos(datos)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setCargando(false)
      })
  }

  useEffect(() => {
    obtenerProductos()
  }, []) // [] => se ejecuta una sola vez, al cargar la app.

  // 2) Persistencia: cada vez que cambia el carrito, se guarda en localStorage
  //    para conservarlo aunque se actualice la página.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
    } catch {
      // Si el navegador bloquea el almacenamiento, la app sigue funcionando.
    }
  }, [carrito])

  // ---- LÓGICA DEL CARRITO ----

  // Agrega un producto; si ya existe, sólo aumenta su cantidad.
  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id)
      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
      }
      return [...actual, { ...producto, cantidad: 1 }]
    })
    setToast({ texto: `"${producto.nombre}" se agregó al carrito.`, tipo: 'exito' })
  }

  // Cambia la cantidad de un producto en +1 o -1.
  // Si la cantidad llega a 0, el producto se elimina del carrito.
  function cambiarCantidad(id, delta) {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item,
        )
        .filter((item) => item.cantidad > 0),
    )
  }

  // Vacía por completo el carrito.
  function vaciarCarrito() {
    setCarrito([])
  }

  // Simula la compra: muestra confirmación y luego un Toast en vez de alert().
  function pagar() {
    const confirmado = window.confirm(
      '¿Confirmas tu compra? Se vaciará el carrito.',
    )
    if (!confirmado) return
    vaciarCarrito()
    setCarritoAbierto(false)
    setToast({
      texto: '¡Gracias por tu compra! Tu pedido fue registrado.',
      tipo: 'exito',
    })
  }

  // ---- DATOS DERIVADOS ----

  // Lista de categorías para la barra de navegación.
  const categorias = ['Todo', 'Cocina', 'Decoración', 'Jardín']

  // Filtra por categoría y por texto de búsqueda al mismo tiempo.
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      categoriaElegida === 'Todo' || p.categoria === categoriaElegida
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  // Total de unidades en el carrito (reduce, según la retroalimentación previa).
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <>
      <Navbar
        categorias={categorias}
        categoriaElegida={categoriaElegida}
        onCategoria={setCategoriaElegida}
        busqueda={busqueda}
        onBuscar={setBusqueda}
        totalUnidades={totalUnidades}
        onAbrirCarrito={() => setCarritoAbierto(true)}
      />

      <main className="container my-4">
        <div className="row g-4">
          {/* Catálogo de productos */}
          <div className="col-lg-8">
            <Catalogo
              cargando={cargando}
              error={error}
              productos={productosFiltrados}
              carrito={carrito}
              onAgregar={agregarAlCarrito}
              onReintentar={obtenerProductos}
              base={BASE}
            />
          </div>

          {/* Carrito de compras */}
          <div className="col-lg-4">
            <Carrito
              carrito={carrito}
              totalUnidades={totalUnidades}
              onCambiarCantidad={cambiarCantidad}
              onVaciar={vaciarCarrito}
              onPagar={pagar}
              abierto={carritoAbierto}
              onCerrar={() => setCarritoAbierto(false)}
              base={BASE}
            />
          </div>
        </div>
      </main>

      {/* Toast: reemplaza a alert() para mantener coherencia visual */}
      <Toast toast={toast} onCerrar={() => setToast(null)} />
    </>
  )
}

export default App
