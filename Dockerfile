FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY frontend/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente del frontend
COPY frontend/ ./

# Construir la aplicación frontend con optimizaciones
RUN npm run build

# Etapa del backend
FROM node:18-alpine AS backend

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Crear usuario no root para seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY backend/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente del backend
COPY backend/ ./

# Copiar los archivos construidos del frontend
COPY --from=frontend-build /app/frontend/dist ./public

# Variables de entorno
ENV PORT=4000
ENV NODE_ENV=production

# Cambiar la propiedad de los archivos al usuario no root
RUN chown -R appuser:appgroup /app

# Cambiar al usuario no root
USER appuser

# Exponer el puerto
EXPOSE 4000

# Healthcheck para Railway
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/api/health || exit 1

# Comando para iniciar la aplicación
CMD ["npm", "start"]
