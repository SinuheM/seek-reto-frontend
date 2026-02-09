# Seek — Sistema de Gestión de Tareas

### Resumen
- Aplicación de gestión de tareas creada con Next.js (App Router).
- Funcionalidades: autenticación simulada (JWT mock), CRUD de tareas, protección de rutas, mocks para la API y pruebas unitarias.

### Instalación

```bash
git clone <repo-url>
cd seek-reto-frontend
npm install
```

### Scripts útiles
```bash
npm run dev
npm run test -- --coverage
```

### Arquitectura general
- Next.js (App Router) con componentes server/client según necesidad.
- Estructura principal:
  - app/             → páginas y layout (App Router)
  - src/components/  → componentes UI reutilizables, separados por funcionalidad
  - src/hooks/       → hooks donde se integra el llamado al API, en caso crece la aplicación la llegaría a separar por funcionalidad (services / features)
  - src/app/api/   → endpoints API mock
  - src/__tests/           → tests unitarios de login y tareas, usando react-testing-library
- Autenticación: mock de JWT guardado en localStorage por simplicidad.
