# Backend en Railway

Esta guía deja el backend en Railway y el frontend en Vercel.

## Arquitectura objetivo

- `frontend`: desplegado en Vercel
- `backend`: desplegado en Railway desde la carpeta `/backend`
- `MongoDB`: sigue donde ya lo tengas hoy, o se migra después si quieres

## Qué hay preparado en este repo

- El backend ya escucha en `0.0.0.0:$PORT` mediante [backend/server.js](./backend/server.js).
- Railway puede desplegar el servicio desde `/backend` usando el `Dockerfile` de esa carpeta.
- La config de Railway para ese servicio está en [backend/railway.toml](./backend/railway.toml).
- El frontend puede apuntar al backend de Railway usando `VITE_API_URL`.

## Crear el servicio en Railway

### Opción recomendada: conectar GitHub

1. En Railway crea un proyecto nuevo.
2. Elige `Deploy from GitHub Repo`.
3. Selecciona este repositorio.
4. Abre el servicio creado y entra en `Settings`.
5. Configura:

- `Root Directory`: `/backend`
- `Config as Code`: `/backend/railway.toml`

Con esa combinación Railway tratará este repo como un monorepo aislado y desplegará solo el backend.

## Variables de entorno del backend

En el servicio de Railway define estas variables:

```env
NODE_ENV=production
MONGO_URI=tu_uri_de_mongodb
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Portfolio Contact <contacto@tu-dominio-verificado.com>
CONTACT_TO_EMAIL=tu_correo_personal@gmail.com
ALLOWED_ORIGINS=https://tu-frontend.vercel.app,https://tu-dominio.com
```

Notas:

- `ALLOWED_ORIGINS` acepta varios dominios separados por comas.
- Si tu frontend sigue en Vercel, incluye ahí el dominio real de Vercel y cualquier dominio personalizado.
- `RESEND_FROM_EMAIL` debe usar un dominio que hayas verificado en Resend.
- `CONTACT_TO_EMAIL` es el correo donde quieres recibir los mensajes del formulario.
- Si prefieres mantener SMTP para desarrollo local, `EMAIL_USER` y `EMAIL_PASS` siguen funcionando como fallback fuera de Railway.

## Publicar el backend

1. En Railway abre `Settings`.
2. En `Networking > Public Networking`, genera un dominio público.
3. Copia la URL resultante, por ejemplo:

```text
https://tu-backend.up.railway.app
```

4. Comprueba que responde:

```text
https://tu-backend.up.railway.app/api/health
```

Debería devolver algo como:

```json
{ "status": "ok" }
```

## Conectar Vercel con Railway

En Vercel añade esta variable al frontend:

```env
VITE_API_URL=https://tu-backend.up.railway.app/api
```

Después redepliega el frontend en Vercel para que tome la nueva variable.

## Checklist de migración desde Heroku

1. Crear el nuevo servicio en Railway desde este mismo repo.
2. Configurar `Root Directory` como `/backend`.
3. Configurar `Config as Code` como `/backend/railway.toml`.
4. Copiar o importar las variables que hoy usas en Heroku:

- `MONGO_URI`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `NODE_ENV`

5. Generar el dominio público de Railway.
6. Poner esa URL en `VITE_API_URL` dentro de Vercel.
7. Redeploy del frontend en Vercel.
8. Probar en producción:

- `GET /api/health`
- búsqueda de clima
- envío del formulario de contacto
- recepción del correo
- respuesta al `replyTo`

## Si algo falla

- Si Railway no arranca, revisa primero `MONGO_URI`.
- Si el frontend no llega al backend, revisa `VITE_API_URL` en Vercel.
- Si el backend bloquea el navegador, revisa `ALLOWED_ORIGINS`.
- Si el correo no sale, revisa `RESEND_API_KEY`, `RESEND_FROM_EMAIL` y que el dominio esté verificado en Resend.
