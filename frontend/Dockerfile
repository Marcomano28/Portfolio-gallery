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
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY build/ /usr/share/nginx/html
# COPY --from=build /app/dist /usr/share/nginx/html
# Establece la variable de entorno PORT
ENV PORT $PORT
# Exponemos el puerto (opcional, Heroku lo gestiona automáticamente)
EXPOSE $PORT
# Comando de inicio que genera el nginx.conf y lanza Nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]