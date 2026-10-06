# Greda & Mimbre — eCommerce en React

Tienda online de artículos para el hogar (**greda y mimbre**) desarrollada con
**React**. Es la evolución del proyecto de semanas anteriores: ahora las
funcionalidades clave (catálogo, carrito y filtros) se construyen con componentes
y se gestionan con los hooks `useState` y `useEffect`, aplicando además
renderizado condicional.

- **Repositorio:** https://github.com/NicolePlaza/Exp3S8FrontendI.git
- **Sitio publicado:** https://TU-USUARIO.github.io/greda-mimbre-react/

---

## Funcionalidades

- **Catálogo cargado dinámicamente** desde un archivo `productos.json` mediante
  `fetch` dentro de `useEffect`.
- **Gestión de estados con `useState`:** lista de productos, productos del
  carrito y elementos interactivos (botón que cambia de texto).
- **Carrito de compras:** agregar productos, aumentar/disminuir cantidades,
  eliminación automática al llegar a cero, total y contador de unidades.
- **Renderizado condicional:**
  - mensaje cuando el carrito está vacío,
  - spinner mientras cargan los datos y alerta con botón **Reintentar** si falla,
  - aviso cuando la búsqueda no arroja resultados,
  - botón que alterna entre **"Agregar al carrito"** y **"En el carrito"**.
- **Filtros por categoría** (Cocina, Decoración, Jardín) combinados con búsqueda.
- **Persistencia del carrito** en `localStorage` (se conserva al recargar).
- **Aviso tipo Toast** al agregar un producto y **confirmación** antes de pagar.
- **Diseño responsivo** con Bootstrap 5: el carrito es columna en escritorio y
  panel deslizante en móvil.

## Tecnologías

- React 18
- Vite (empaquetador y servidor de desarrollo)
- Bootstrap 5.3 y Bootstrap Icons (vía CDN)
- `gh-pages` para el despliegue

## Estructura del proyecto

```
greda-mimbre-react/
├── public/
│   ├── productos.json        # Fuente de datos del catálogo
│   └── img/                  # Imágenes de los productos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Barra de navegación, categorías y buscador
│   │   ├── Catalogo.jsx      # Grilla + renderizado condicional de estados
│   │   ├── ProductoCard.jsx  # Tarjeta de producto con botón dinámico
│   │   ├── Carrito.jsx       # Carrito de compras
│   │   └── Toast.jsx         # Aviso emergente
│   ├── App.jsx               # Estados (useState) y efectos (useEffect)
│   ├── main.jsx              # Punto de entrada
│   └── styles.css            # Estilos propios
├── index.html
├── package.json
└── vite.config.js
```