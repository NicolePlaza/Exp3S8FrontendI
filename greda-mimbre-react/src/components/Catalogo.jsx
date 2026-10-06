import ProductoCard from './ProductoCard.jsx'

// Catálogo de productos. Aplica RENDERIZADO CONDICIONAL para mostrar:
//  - un spinner mientras cargan los datos,
//  - un mensaje de error con botón "Reintentar" si la carga falla,
//  - un aviso cuando la búsqueda/filtro no arroja resultados,
//  - o la grilla de productos cuando todo está correcto.
function Catalogo({
  cargando,
  error,
  productos,
  carrito,
  onAgregar,
  onReintentar,
  base,
}) {
  // 1) Cargando
  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    )
  }

  // 2) Error de carga
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">
          <i className="bi bi-exclamation-triangle me-2"></i>
          No se pudieron cargar los productos
        </h5>
        <p className="mb-3">{error}</p>
        <button className="btn btn-outline-danger" onClick={onReintentar}>
          <i className="bi bi-arrow-clockwise me-1"></i>Reintentar
        </button>
      </div>
    )
  }

  // 3) Sin resultados para el filtro/búsqueda
  if (productos.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="bi bi-search me-2"></i>
        No encontramos productos que coincidan con tu búsqueda.
      </div>
    )
  }

  // 4) Grilla de productos (caso correcto)
  return (
    <div className="row row-cols-2 row-cols-md-3 g-3">
      {productos.map((producto) => {
        // Indica si el producto ya está en el carrito (para el botón dinámico).
        const enCarrito = carrito.some((item) => item.id === producto.id)
        return (
          <div className="col" key={producto.id}>
            <ProductoCard
              producto={producto}
              enCarrito={enCarrito}
              onAgregar={onAgregar}
              base={base}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Catalogo
