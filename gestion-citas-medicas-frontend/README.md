# Gestión de Citas Médicas — Frontend (React + Vite)

Frontend para consumir el backend de **Gestión de Citas Médicas** (Django REST).

## Requisitos
- Node.js 18+
- Backend corriendo en `http://localhost:8000` con rutas bajo `/api/`.

## Configuración
Crea un archivo `.env` en la raíz (o usa `.env.sample`):
```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

## Instalación
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` — levanta el servidor de desarrollo
- `npm run build` — compila para producción
- `npm run preview` — sirve la build

## Estructura
- `src/services/api.js` — cliente Axios y servicios CRUD
- `src/pages/*` — páginas por recurso (Pacientes, Médicos, Citas, Consultas)
- `src/components/Navbar.jsx` — navegación
- `src/router.jsx` — rutas

## GitHub (crear repositorio y primer push)
Puedes usar el script `scripts/first-push.sh` si tienes instalado `git` y `gh`:
```bash
bash scripts/first-push.sh
```

## Notas
- Asegúrate de que el backend exponga las rutas `/api/pacientes/`, `/api/medicos/`, `/api/citas/`, `/api/consultas/`.
- Si tu backend usa otra URL/base, ajusta `VITE_API_BASE_URL` en `.env`.
