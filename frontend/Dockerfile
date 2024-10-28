FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Asegurarse de que las variables de entorno estén disponibles durante el build
ARG VITE_API_KEY
ARG VITE_API_URL
ARG VITE_API_KEY_TZ

ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY_TZ=$VITE_API_KEY_TZ

RUN npm run build
# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine
# Elimina la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copia la plantilla de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# Establece la variable de entorno PORT
ENV PORT $PORT
# Exponemos el puerto (opcional, Heroku lo gestiona automáticamente)
EXPOSE $PORT
# Comando de inicio que genera el nginx.conf y lanza Nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
