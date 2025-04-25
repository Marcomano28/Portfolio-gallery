# Despliegue en Railway con Docker

Este documento explica cómo desplegar esta aplicación en Railway utilizando Docker.

## Requisitos previos

1. Tener una cuenta en [Railway](https://railway.app/)
2. Tener instalado Git en tu máquina local
3. Tener configuradas las variables de entorno necesarias

## Variables de entorno necesarias

### Variables para el backend
- `MONGO_URI`: URL de conexión a la base de datos MongoDB
- `EMAIL_USER`: Usuario para el servicio de correo electrónico
- `EMAIL_PASS`: Contraseña para el servicio de correo electrónico

### Variables para el frontend (incluidas en la construcción)
- `VITE_API_KEY`: Clave API para servicios externos
- `VITE_API_KEY_TZ`: Clave API para servicios de zona horaria

### Configuración general
- `NODE_ENV`: Entorno de ejecución ("production" para Railway)

## Pasos para el despliegue

### 1. Iniciar sesión en Railway

```bash
# Instalar la CLI de Railway si no la tienes
npm i -g @railway/cli

# Iniciar sesión
railway login
```

### 2. Inicializar el proyecto en Railway

```bash
# Navega a la carpeta de tu proyecto
cd ruta/a/tu/proyecto

# Inicializa el proyecto en Railway
railway init
```

### 3. Configurar variables de entorno

```bash
# Configurar las variables de entorno necesarias para el backend
railway variables set MONGO_URI=tu_url_de_mongodb
railway variables set EMAIL_USER=tu_email_user
railway variables set EMAIL_PASS=tu_email_password

# Configurar el entorno
railway variables set NODE_ENV=production
```

Nota: Las variables del frontend (VITE_API_KEY, VITE_API_KEY_TZ) ya están incluidas en el archivo .env.production que se copia durante la construcción de la imagen Docker.

### 4. Desplegar la aplicación

```bash
# Desplegar la aplicación
railway up
```

### 5. Abrir la aplicación

```bash
# Abrir la aplicación en el navegador
railway open
```

## Estructura de archivos Docker

El proyecto incluye los siguientes archivos para Docker:

- `Dockerfile`: Archivo principal para Railway que combina frontend y backend
- `docker-compose.yml`: Para desarrollo local con Docker Compose
- `backend/Dockerfile`: Dockerfile específico para el backend
- `frontend/Dockerfile`: Dockerfile específico para el frontend
- `.dockerignore`: Archivos a ignorar en la construcción de la imagen

## Notas adicionales

- Railway detectará automáticamente el Dockerfile en la raíz del proyecto
- El archivo `railway.toml` contiene configuraciones específicas para Railway
- La aplicación estará disponible en la URL proporcionada por Railway
- Puedes configurar un dominio personalizado en la configuración de Railway
