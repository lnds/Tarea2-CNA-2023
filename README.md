# Tarea2 CNA 2023 --> Marco Aguilar -- Rocío Contreras Águila

Haga un fork de este repo.
Envía un Pull Request con las repuestas.

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


Levantar el servicio con los comandos:

        npm install
        node app.js

Guarda en algún lado la url que publica Replit, lo vas a usar en el paso 4.

Respuesta: en yark: token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzY1OGVkNTEtMTVmZi00NTIzLTk2YjQtZjg4NjQ0NDZhMjdiIiwibmFtZSI6IlJvY2lvIENvbnRyZXJhcyBBIiwiaWF0IjoxNjk2Mjc1NTI3LCJleHAiOjE2OTYyNzkxMjd9.W8sJDUnvh8Oxphf55BnLsecsJ7h_9jsXn4Af41t5w6E

URL: servidordeusuarios.rociocontrerasa.repl.co

BD: postgres://paxpugvz:N-JSicmHAJpA9OiG2I9FyOjKkFYAoOiK@silly.db.elephantsql.com/paxpugvz

# Paso 3

Crear un segundo Replit, con node.js copia acá el contenido del directorio `ws-server`.

Acá también hay que crear el secret `PORT`, puede tener cualquier valor.

Levantar el servicio con el comando:

        npm install
        node index.js

Guarda el valor de la url que publica replit, también lo usarás en el paso 4

URL: wsserver.rociocontrerasa.repl.co


# Paso 4

Crear el tercer Replit con `REACT JavaScript` y copiar el contenido de la carpeta `chat-frontend`.

IMPORTANTE:

En este caso hay que hacer lo siguiente en la shell:

        git clone https://github.com/lnds/Tarea2-CNA-2023.git

        cp -R Tarea2-CNA-2023/chat-frontend/* .


Modificar el archivo `src/components/const.js` cambia el valor del string `serverApiUrl` en la linea 1 de este archivo por el valor de la URL publicada en el paso 2.

Modificar el archivo `src/websocket.js` cambiando el valor del string `host` con el valor de la URL publicada en el paso 3.

Levanta la aplicación presionado el botón RUN de replit.

Prueba la conexión registrandote como usuario usando la interfaz. Si todo está ok puedes chatear.

URL: frontend.rociocontrerasa.repl.co


# Integrantes del Grupo
- Marco Aguilar Fuentes
- Rocio Contreras Aguila

# 1. Modifica el Payload del token JWT para incluir la fecha de nacimiento del usuario. Incluye el código que modificaste como respuesta.
{
  "user": "7658ed51-15ff-4523-96b4-f8864446a27b",
  "name": "Rocio Contreras A",
  "Fnac": "22/09/1977"
  "iat": 1696275527,
  "exp": 1696279127
}
   
# 2. Ejecuta el endpoint `login` usando la herramienta `YARC`, obtén el token JWT y verifica en la herramienta [JWT Debugger](https://jwt.io) que el token incliye la fecha de nacimiento. Copia el token en base 64 y decodificado como respuesta a esta actividad.

![](yarc.png)   
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzY1OGVkNTEtMTVmZi00NTIzLTk2YjQtZjg4NjQ0NDZhMjdiIiwibmFtZSI6IlJvY2lvIENvbnRyZXJhcyBBIiwiaWF0IjoxNjk2Mjc1NTI3LCJleHAiOjE2OTYyNzkxMjd9.W8sJDUnvh8Oxphf55BnLsecsJ7h_9jsXn4Af41t5w6E"
}

{
  "user": "7658ed51-15ff-4523-96b4-f8864446a27b",
  "name": "Rocio Contreras A",
  "iat": 1696275527,
  "exp": 1696279127
}

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  
your-256-bit-secret

) secret base64 encoded

# 3. El diseño de la aplicación tiene una vulnerabilidad relacionada con el acceso al servidor WebSockets, ¿puedes indicar cuál es? ¿Cómo la solucionarías?

Mayor seguridad que sirva para garatinzar la autenticacion y la seguridad de las comunicaciones con el uso de tokens. En este caso:

Generar y Enviar del token: el usuario cliente recibe el token y puede ser almacenado en una cookie de forma local en el navegador del usuario dependiendo de la compatibilidad.

Envío de token a las conexiones de websockets: el cliente establece una conexión WebSocket con el servidor y luego se envia el token en un mensaje de apertura o encabezado personalizado para que el servidor autentique al usuario.

Validación del token: en el servidor de websockets, se debe validar el token recibido por el cliente y verificar que sea válido. Se debe considerar también el manejo de errores y renovación de tokens, entre otros aspectos.

# 4. ¿Que habría que hacer para validar que los usuarios de esta aplicación fueran mayores de 13 años? ¿Dónde controlarías esa condición? ¿Qué habría que agregar en el frontend?

En users-svc implementar una regla de negocio, al momento de registrarse (app.post("/register", async (req, res) que verifique con la información ingresada por parte del usuario, si tiene o no el mínimo requerido, en este caso >13.

En el front-end, implementar en el formulario de registro un elemento de tipo calendario para que el usuario ingrese su fecha de nacimiento. A través de react, se debería importar una biblioteca, "react-big-calendar", creando y configurando el componente necesario para ello.











