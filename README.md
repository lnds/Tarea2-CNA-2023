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
2. Ejecuta el endpoint `login` usando la herramienta `YARC`, obtén el token JWT y verifica en la herramienta [JWT Debugger](https://jwt.io) que el token incliye la fecha de nacimiento. Copia el token en base 64 y decodificado como respuesta a esta actividad.

![](yarc.png)   

4. El diseño de la aplicación tiene una vulnerabilidad relacionada con el acceso al servidor WebSockets, ¿puedes indicar cuál es? ¿Cómo la solucionarías?
5. ¿Que habría que hacer para validar que los usuarios de esta aplicación fueran mayores de 13 años? ¿Dónde controlarías esa condición? ¿Qué habría que agregar en el frontend?

Colocar el nombre de los integrantes del grupo y las respuestas al final de este archivo.

# Integrantes del Grupo
Jazna Meza Hidalgo
Ricardo Pino Aranda

# Respuesta 1
```
const jwtGenerator = (userId, user) => {
  // genera un token jwt para el usuario dado
  if (userId) {
    const payload = {
      user: userId,
      name: user.name,
      birthday: user.birthday
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" })
  }
  return "invalid token"
}
```

# Respuesta 2
El token verificado se encuentra en el archivo jwt_verificado.png.
![](jwt_verificado.png) 

# Respuesta 3
La vulnerabilidad es que no se usar ws sobre HTTPS, en otras palabras no se puede usar WebSocket sobre HTTPS, se puede usar sobre TLS, para solucionar esta vulnerabilidad Se debería usar “wss://“ en la URI.

# Respuesta 4
Para validar la regla de negocio donde la edad debe ser mayor a 13 años codificaría un flujo de control (IF) en el metodo register para comparar la diferencia en años entre el Birthday y la fecha actual al momento del registro, la cual debe ser mayor a 13. Además se debería comparar la diferencia en años entre el Birthday del registro asociado al usuario que se está logeando con la fecha actual. Esto en el caso de que ya exista un Birthday registrado anteriormente en el usario, este cambio debería ser realizado en el login BackEnd. En el Frond End se debería agregar en el formulario el campo Birthday para solicitar el ingreso de la fecha de nacimiento y posteriormente realizar la validación.
