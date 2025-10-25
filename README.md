# Parcial 2 - Implantación de Sistemas

## Proyecto: parcial-docker-integrado

## Información del Estudiante

- **Nombre:** DENNYS ALEXANDER MENJIVAR ALVARADO
- **Expediente:** 25728
- **Código Estudiantil:** MA22I04001

---

## Ejercicio #01: Servicio Base con Dockerfile

### Comandos Ejecutados

```bash
# 1. Construir la imagen
docker build -t parcial-api .

# 2. Ejecutar el contenedor
docker run -d -p 3000:3000 parcial-api

# 3. Verificar que está corriendo
docker ps

# 4. Probar endpoints
curl http://localhost:3000/
curl http://localhost:3000/health

# 5. Ver tamaño de la imagen
docker images parcial-api
```

## Ejercicio #02: Persistencia con PostgreSQL

### Comandos Ejecutados

```bash
# 1. Crear volumen nombrado
docker volume create db_data

# 2. Ejecutar contenedor PostgreSQL
docker run -d \
  --name postgres-parcial \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=12345 \
  -e POSTGRES_DB=parcial_db \
  -v db_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15-alpine

# 3. Verificar que el contenedor está corriendo
docker ps

# 4. Conectarse a PostgreSQL para crear tabla
docker exec -it postgres-parcial psql -U admin -d parcial_db
```

### SQL ejecutado dentro de PostgreSQL

```sql
-- Crear tabla estudiantes
CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  expediente VARCHAR(20) NOT NULL,
  codigo VARCHAR(20) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO estudiantes (nombre, expediente, codigo)
VALUES ('Juan Pérez', 'EXP-001', 'COD-2024-001');

INSERT INTO estudiantes (nombre, expediente, codigo)
VALUES ('María González', 'EXP-002', 'COD-2024-002');

-- Verificar datos insertados
SELECT * FROM estudiantes;

-- Salir de psql
\q
```

### Verificar Persistencia

```bash
# 5. Reiniciar contenedor para verificar persistencia
docker restart postgres-parcial

# 6. Volver a conectar y verificar datos
docker exec -it postgres-parcial psql -U admin -d parcial_db -c "SELECT * FROM estudiantes;"

# 7. Verificar volumen creado
docker volume ls

# 8. Inspeccionar volumen
docker volume inspect db_data
```

---

## Ejercicio #03: Integración con Docker Compose

### Comandos Ejecutados

```bash
# 1. Levantar servicios con Docker Compose
docker compose up -d --build

# 3. Verificar servicios corriendo
docker compose ps

# 4. Verificar logs
docker compose logs

# 5. Verificar red creada
docker network ls

# 6. Probar endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/estudiantes

# 8. Detener servicios
docker compose down

# 9. Detener y eliminar volúmenes
docker compose down -v
```

---

## Estructura del Proyecto

```
parcial-docker-integrado/
├── server.js
├── package.json
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── .env
├── README.md
```

---
