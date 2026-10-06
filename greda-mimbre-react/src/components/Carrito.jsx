// Carrito de compras. En escritorio es una columna fija; en móvil se muestra
// como panel deslizante (controlado por "abierto"). Usa RENDERIZADO CONDICIONAL
// para mostrar un mensaje cuando está vacío o la lista de productos cuando no.
function Carrito({
  carrito,
  totalUnidades,
  onCambiarCantidad,
  onVaciar,
  onPagar,
  abierto,
  onCerrar,
  base,
}) {
  const vacio = carrito.length === 0

  // Total a pagar calculado con reduce (precio x cantidad de cada producto).
  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  )

  return (
    <>
      {/* Fondo oscuro: sólo visible (por CSS) cuando el panel está abierto en móvil */}
      {abierto && <div className="gm-backdrop" onClick={onCerrar}></div>}

      <aside
        className={
          'card shadow-sm gm-carrito-panel' + (abierto ? ' gm-abierto' : '')
        }
      >
        <div className="card-header d-flex justify-content-between align-items-center bg-white">
          <h5 className="mb-0">
            <i className="bi bi-cart3 me-2"></i>Tu carrito
            {totalUnidades > 0 && (
              <span className="badge bg-secondary ms-2">{totalUnidades}</span>
            )}
          </h5>
          <button
            className="btn-close gm-cerrar-carrito"
            aria-label="Cerrar carrito"
            onClick={onCerrar}
          ></button>
        </div>

        <div className="card-body">
          {vacio ? (
            // Mensaje cuando el carrito está vacío
            <div className="text-center text-muted py-4">
              <i className="bi bi-cart-x fs-1"></i>
              <p className="mt-2 mb-0">Tu carrito está vacío.</p>
              <small>Agrega productos desde el catálogo.</small>
            </div>
          ) : (
            // Lista de productos del carrito
            <ul className="list-group list-group-flush">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center gap-2 px-0"
                >
                  <img
                    src={`${base}${item.imagen}`}
                    alt={item.nombre}
                    width="48"
                    height="48"
                    className="rounded"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <div className="small fw-semibold">{item.nombre}</div>
                    <div className="small text-muted">
                      ${item.precio.toLocaleString('es-CL')}
                    </div>
                  </div>
                  <div className="btn-group btn-group-sm" role="group">
                    <button
                      className="btn btn-outline-secondary"
                      aria-label="Quitar una unidad"
                      onClick={() => onCambiarCantidad(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="btn btn-light disabled">
                      {item.cantidad}
                    </span>
                    <button
                      className="btn btn-outline-secondary"
                      aria-label="Agregar una unidad"
                      onClick={() => onCambiarCantidad(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-footer bg-white">
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Total:</span>
            <span className="gm-precio">${total.toLocaleString('es-CL')}</span>
          </div>
          {/* Los botones se deshabilitan cuando el carrito está vacío */}
          <div className="d-grid gap-2">
            <button
              className="btn btn-success"
              disabled={vacio}
              onClick={onPagar}
            >
              <i className="bi bi-bag-check me-1"></i>Ir a pagar
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              disabled={vacio}
              onClick={onVaciar}
            >
              <i className="bi bi-trash me-1"></i>Vaciar carrito
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Carrito
