// Barra de navegación con el logo, las categorías (filtro), el buscador
// y el botón del carrito con el contador de unidades.
function Navbar({
  categorias,
  categoriaElegida,
  onCategoria,
  busqueda,
  onBuscar,
  totalUnidades,
  onAbrirCarrito,
}) {
  // Evita que el formulario de búsqueda recargue la página.
  function manejarSubmit(e) {
    e.preventDefault()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark gm-navbar sticky-top">
      <div className="container">
        <span className="navbar-brand gm-logo mb-0 h1">
          <i className="bi bi-house-heart me-2"></i>Greda &amp; Mimbre
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Mostrar menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          {/* Categorías: al hacer clic cambian el filtro (useState en App) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categorias.map((cat) => (
              <li className="nav-item" key={cat}>
                <button
                  className={
                    'nav-link btn btn-link' +
                    (categoriaElegida === cat ? ' active fw-bold' : '')
                  }
                  onClick={() => onCategoria(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          {/* Buscador: actualiza el estado de búsqueda en cada tecla */}
          <form className="d-flex me-lg-3 my-2 my-lg-0" onSubmit={manejarSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar producto..."
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => onBuscar(e.target.value)}
            />
          </form>

          {/* Botón del carrito con contador de unidades */}
          <button
            className="btn btn-light position-relative"
            onClick={onAbrirCarrito}
          >
            <i className="bi bi-cart3"></i>
            <span className="ms-1 d-lg-none">Carrito</span>
            {totalUnidades > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalUnidades}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
