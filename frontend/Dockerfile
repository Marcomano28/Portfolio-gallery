FROM node:18 AS build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build
# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine
# Copiamos los archivos de la carpeta dist generados por Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Iniciamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
