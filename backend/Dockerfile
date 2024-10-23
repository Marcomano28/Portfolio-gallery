FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json /app/

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . /app/

# Exponer el puerto en el que la aplicación escuchará
ENV PORT=4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
