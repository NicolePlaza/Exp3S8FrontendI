import { useEffect } from 'react'

// Toast (aviso emergente) que reemplaza a window.alert() para mantener
// coherencia visual con Bootstrap. Se oculta solo después de unos segundos.
function Toast({ toast, onCerrar }) {
  // Efecto: cuando aparece un toast, programa su cierre automático a los 3 s.
  useEffect(() => {
    if (!toast) return
    const temporizador = setTimeout(onCerrar, 3000)
    // Limpia el temporizador si el toast cambia o el componente se desmonta.
    return () => clearTimeout(temporizador)
  }, [toast, onCerrar])

  // Renderizado condicional: si no hay mensaje, no se muestra nada.
  if (!toast) return null

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1100 }}
    >
      <div className="toast show align-items-center text-bg-success border-0">
        <div className="d-flex">
          <div className="toast-body">
            <i className="bi bi-check-circle me-2"></i>
            {toast.texto}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Cerrar aviso"
            onClick={onCerrar}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default Toast
