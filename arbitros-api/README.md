# Árbitros API (Express) — Taller 02

API REST en **Node.js/Express** que **consume** la API de **Spring Boot** del Entregable 1.
Incluye Swagger, manejo de errores, Dockerfile, y `whoami` para verificar contenedores.

## Requisitos
- Node 18+
- Proyecto **Spring Boot** del entregable 1 corriendo (exponiendo rutas `/api/...`)
- (Opcional) AWS S3 con imágenes públicas

## Configuración
1. Copia `.env.example` a `.env` y ajusta:
```
PORT=3000
SPRING_API_BASE=http://localhost:8080/api
# SPRING_API_KEY=opcional
S3_PUBLIC_IMAGES=
```

2. Instala dependencias y ejecuta:
```bash
npm install
npm run dev
# o
npm start
```
Visita: `http://localhost:3000/api-docs`

## Endpoints principales
- `GET /api/health` — ping
- `GET /api/whoami` — devuelve `hostname` (para validar contenedores distintos)
- `POST /api/auth/register` — proxy hacia Spring
- `POST /api/auth/login` — proxy hacia Spring
- `GET /api/arbitros` — proxy hacia Spring
- `GET /api/arbitros/:id` — proxy hacia Spring
- `GET /api/arbitros/:id/partidos` — proxy hacia Spring
- `GET /api/arbitros/:id/asignaciones` — proxy hacia Spring
- `GET /api/arbitros/:id/liquidaciones` — proxy hacia Spring
- `GET /api/s3/images` — devuelve URLs públicas configuradas en ENV

> **Nota:** Ajusta las rutas en `src/services/arbitrosService.js` si tu Spring usa prefijos distintos.

## Docker (local)
Construir y correr:
```bash
docker build -t arbitros-api:local .
docker run -p 3000:3000 \
  -e SPRING_API_BASE=http://host.docker.internal:8080/api \
  --name arbitros \
  arbitros-api:local
```

## DockerHub con GitHub Actions
1. Crea un repo en DockerHub: `tuusuario/arbitros-api`.
2. En tu repo de GitHub, agrega secrets:
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN` (Access Token)
3. Haz push a `main`. La acción construirá y publicará `tuusuario/arbitros-api:latest`.

## Despliegue en AWS con Docker Swarm
### 1) Crear 4 instancias EC2
- Ubuntu 22.04 / Amazon Linux 2023, con puerto 80 abierto.
- Instala Docker en todas y habilítalo.

### 2) Inicializar Swarm en la líder
```bash
docker swarm init --advertise-addr <IP_LIDER>
# Guarda el token de manager:
docker swarm join-token manager
```

### 3) Unir las otras 3 como managers
En cada una:
```bash
docker swarm join --token <TOKEN_MANAGER> <IP_LIDER>:2377
```

Verifica en la líder:
```bash
docker node ls
```

### 4) Crear servicio desde DockerHub
```bash
docker service create \
  --name arbitros-service \
  --replicas 10 \
  --publish 80:3000 \
  --env SPRING_API_BASE=http://<IP_SPRING>:8080/api \
  --env S3_PUBLIC_IMAGES="https://bucket.s3.amazonaws.com/a1.jpg,https://bucket.s3.amazonaws.com/a2.jpg" \
  <tuusuario>/arbitros-api:latest
```

> Si tu Spring también corre en el Swarm, considera redes overlay y usa el nombre del servicio de Spring como host.

### 5) Verificación requerida por el taller
- **10 réplicas**:  
  ```bash
  docker service ps arbitros-service
  ```
- **Contenedores distintos** (IDs/hostnames):
  - Abre dos veces `http://<IP_PUBLICA>/api/whoami` y verifica `hostname` distinto.
- **Swagger**: `http://<IP_PUBLICA>/api-docs`
- **Imágenes S3**: `http://<IP_PUBLICA>/api/s3/images`

### 6) Actualizar la imagen (rolling update)
```bash
docker service update --image <tuusuario>/arbitros-api:latest arbitros-service
```

## Notas de S3
- Crea un **bucket público** y sube 7–10 fotos de árbitros.
- Usa las URLs públicas en `S3_PUBLIC_IMAGES` o persístelas desde Spring.

## Estructura
```
src/
  config/swagger.js
  controllers/arbitrosController.js
  middlewares/errorHandler.js
  routes/arbitrosRoutes.js
  services/arbitrosService.js
  utils/container.js
  app.js
  server.js
```

¡Éxitos en el taller! Revisa `whoami` para los pantallazos de contenedores distintos.