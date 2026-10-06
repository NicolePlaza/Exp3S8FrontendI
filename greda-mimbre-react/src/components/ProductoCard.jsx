// Tarjeta de un producto del catálogo.
// Incluye el elemento interactivo pedido en la actividad: un botón que
// CAMBIA DE TEXTO Y ESTILO según el estado (renderizado condicional):
//   - "Agregar al carrito"  cuando el producto no está en el carrito,
//   - "En el carrito"        cuando ya fue agregado.
function ProductoCard({ producto, enCarrito, onAgregar, base }) {
  // Formatea el precio en pesos chilenos.
  const precio = producto.precio.toLocaleString('es-CL')

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={`${base}${producto.imagen}`}
        className="card-img-top gm-card-img"
        alt={producto.nombre}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2">
          {producto.categoria}
        </span>
        <h6 className="card-title">{producto.nombre}</h6>
        <p className="card-text small text-muted flex-grow-1">
          {producto.descripcion}
        </p>
        <p className="gm-precio mb-2">${precio}</p>

        {/* Botón dinámico: su texto, color e ícono dependen de "enCarrito" */}
        <button
          className={
            'btn ' + (enCarrito ? 'btn-success' : 'btn-outline-success')
          }
          onClick={() => onAgregar(producto)}
        >
          {enCarrito ? (
            <>
              <i className="bi bi-check2 me-1"></i>En el carrito
            </>
          ) : (
            <>
              <i className="bi bi-cart-plus me-1"></i>Agregar al carrito
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductoCard
