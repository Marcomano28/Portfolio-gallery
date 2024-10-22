FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY backend/package*.json /app/

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY backend/ /app/

# Exponer el puerto en el que la aplicación escuchará
ENV PORT=4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
