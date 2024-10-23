FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine
# Elimina la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copia la plantilla de configuración de Nginx
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
# Copiamos los archivos de la carpeta dist generados por Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Establece la variable de entorno para el puerto
ENV PORT 8080
# Exponemos el puerto (opcional, Heroku lo gestiona automáticamente)
EXPOSE $PORT
# Comando de inicio que reemplaza variables y lanza Nginx
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
