# Tarea2 CNA 2023

Haga un fork de este repo.

# Paso 1

Crear en ElephantSQL una base de datos y ejecutar el script:

```
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday DATE
)
```

Recuperar el string de conexión de elephant SQL

# Paso 2

Crear un Replit con Node JS y copiar el contenido de la carpeta `users-svc` en este replit.

Crear los siguientes secretos:

- PORT: con el numero de port asignado a este servicio, puede ser cualquier valor, sugerencia: 3000
- CONNECTION_URL: copiar acá el string de conexion obtenido en ElephantSQL
- JWT_SECRET: colocar un valor aleatorio, esta es la llave para calcular el HMAC de JWT.


Levantar el servicio con el comando:

        node app.js

Guarda en algún lado la url que publica Replit, lo vas a usar en el paso 4.

# Paso 3

Crear un segundo Replit, con node.js copia acá el contenido del directorio `ws-server`.

Levantar el servicio con el comando:

        node index.js

Guarda el valor de la url que publica replit, también lo usarás en el paso 4

# Paso 4

Crear el tercer Replit con Node.JS y copiar el contenido de la carpeta `chat-frontend`.

Modificar el archivo `src/components/const.js` cambia el valor del string `serverApiUrl` en la linea 1 de este archivo por el valor de la URL publicada en el paso 2.

Modificar el archivo `src/websocket.js` cambiando el valor del string `host` con el valor de la URL publicada en el paso 3.

Levanta la aplicación usando el comando:

            npm run dev

Prueba la conexión registrandote como usuario usando la interfaz. Si todo está ok puedes chatear.

# Actividades y Preguntas

1. Modifica el Payload del token JWT para incluir la fecha de nacimiento del usuario.
2. Ejecuta el endpoint `login` usando la herramienta `YARC`, obtén el token JWT y verifica en la herramienta [JWT Debugger](https://jwt.io) que el token incliye la fecha de nacimiento. Copia el token en base 64 y decodificado como respuesta a esta actividad.
3. El diseño de la aplicación tiene una vulnerabilidad relacionada con el acceo al servidor WebSockets, ¿puedes indicar cuál es? ¿Cómo la solucionarías?
4. ¿Que habría que hacer para validar que los usuarios de esta aplicación fueran mayores de 13 años? ¿Dónde controlarías esa condición? ¿Qué habría que agregar en el frontend?






