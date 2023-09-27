# Tarea2 CNA 2023

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

# Paso 3

Crear un segundo Replit, con node.js copia acá el contenido del directorio `ws-server`.

Acá también hay que crear el secret `PORT`, puede tener cualquier valor.

Levantar el servicio con el comando:

        npm install
        node index.js

Guarda el valor de la url que publica replit, también lo usarás en el paso 4

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

# Actividades y Preguntas

1. Modifica el Payload del token JWT para incluir la fecha de nacimiento del usuario. Incluye el código que modificaste como respuesta.

Respuesta (1): 

const jwtGenerator = (userId, user) => {
  // genera un token jwt para el usuario dado
  if (userId) {
    const payload = {
      user: userId,
      name: user.name,
      birthday: user.birthday,
    }

2. Ejecuta el endpoint `login` usando la herramienta `YARC`, obtén el token JWT y verifica en la herramienta [JWT Debugger](https://jwt.io) que el token incliye la fecha de nacimiento. Copia el token en base 64 y decodificado como respuesta a esta actividad.

![](yarc.png)   

Respuesta (2):

El token JWT proporcionado es el siguiente:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMzBlNmQ0OGEtZGMwMi00ZjAxLWFlYTctYWU1MDE2ZTQwZTdhIiwibmFtZSI6IkdhYnJpZWwgQm9yY2kiLCJiaXJ0aGRheSI6IjIwMTAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImlhdCI6MTY5NTM5MjA3MywiZXhwIjoxNjk1Mzk1NjczfQ.TIX27UHObmvXezGGLM02BL1UJuO-niICDCVgUpGqzpQ"
}

Después de decodificarlo, el token se divide en tres partes: el encabezado, la carga y la firma.

{
  "alg": "HS256",
  "typ": "JWT"
}

Carga (Payload):

{
  "user": "30e6d48a-dc02-4f01-aea7-ae5016e40e7a",
  "name": "Gabriel Borci",
  "birthday": "2010-01-01T00:00:00.000Z",
  "iat": 1695392073,
  "exp": 1695395673
}

Firma (Signature):

TIX27UHObmvXezGGLM02BL1UJuO-niICDCVgUpGqzpQ

La firma es la parte que se utiliza para verificar la autenticidad del token. La información en el encabezado y la carga se utiliza para proporcionar información sobre el token y sus datos asociados.

3. El diseño de la aplicación tiene una vulnerabilidad relacionada con el acceso al servidor WebSockets, ¿puedes indicar cuál es? ¿Cómo la solucionarías?

Respuesta (3):

Se está tratando de iniciar una conexión WebSocket insegura (usando "ws://") desde una página web cargada a través de HTTPS. Los navegadores modernos imponen restricciones de seguridad que impiden que las conexiones WebSocket inseguras se inicien desde una página cargada a través de HTTPS. Esto es una medida de seguridad para proteger la privacidad y la integridad de los datos del usuario.

Para resolver este problema, debes asegurarte de que estás utilizando una conexión WebSocket segura (usando "wss://") en lugar de una conexión WebSocket no segura (usando "ws://"). La notación "wss://" indica que la conexión WebSocket está cifrada y es segura.


4. ¿Que habría que hacer para validar que los usuarios de esta aplicación fueran mayores de 13 años? ¿Dónde controlarías esa condición? ¿Qué habría que agregar en el frontend?

Respuesta (4):

Para validar que los usuarios de la aplicación tengan al menos 13 años, puedes seguir estos pasos:

Frontend:

En el frontend, debes agregar un campo donde los usuarios puedan ingresar su fecha de nacimiento al registrarse o actualizar su perfil. Esto puede ser un formulario con un campo de fecha de nacimiento. Asegúrate de que los usuarios tengan la opción de seleccionar su fecha de nacimiento de manera clara y sencilla.

Backend:

En el backend, debes implementar la lógica de validación de la fecha de nacimiento para asegurarte de que los usuarios sean mayores de 13 años. Esto se puede hacer de la siguiente manera:

Al recibir la fecha de nacimiento del usuario, conviértela en un objeto de fecha (por ejemplo, en JavaScript, puedes usar new Date()).
Luego, calcula la diferencia entre la fecha actual y la fecha de nacimiento para obtener la edad del usuario.
Verifica que la edad sea igual o mayor que 13 años.
Si la edad es menor de 13 años, muestra un mensaje de error y no permitas que el usuario continúe con el registro o la actualización de su perfil.

Mensajes de Error:

En el frontend, asegúrate de mostrar un mensaje de error si la fecha de nacimiento ingresada no cumple con el requisito de edad mínima. Esto ayudará a los usuarios a comprender por qué su registro o actualización de perfil fue rechazado.

Almacenamiento de Datos:

Si estás almacenando la fecha de nacimiento de los usuarios en una base de datos, asegúrate de almacenarla de manera segura y de acuerdo con las regulaciones de privacidad de datos aplicables. Esto puede incluir la encriptación de datos sensibles.

Política de Privacidad y Términos y Condiciones:

Es importante tener una política de privacidad y términos y condiciones claros que indiquen que los usuarios deben tener al menos 13 años para utilizar la aplicación. Los usuarios deben aceptar estos términos antes de registrarse.

Pruebas y Validación Continua:

Realiza pruebas exhaustivas para asegurarte de que la validación de edad funcione correctamente y cumpla con los requisitos legales. Además, mantén tus políticas y prácticas de privacidad actualizadas según sea necesario.

Controlar esta condición debe hacerse tanto en el frontend como en el backend para evitar que los usuarios ingresen fechas de nacimiento falsas o manipuladas. Además, si estás tratando con datos sensibles de usuarios, es importante cumplir con las regulaciones de privacidad de datos, como el Reglamento General de Protección de Datos (GDPR) en la Unión Europea u otras leyes locales de privacidad aplicables.

Colocar el nombre de los integrantes del grupo y las respuestas al final de este archivo.

Integrantes:
- Ignacio J. González P.
- Felix Cifuentes Cid.

# Integrantes del Grupo

# Respuesta 1

# Respuesta 2

# Respuesta 3

# Respuesta 4







