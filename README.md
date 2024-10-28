# Eldar Challenge por Juan M. Goñi
¡Hola! Para levantar este proyecto debemos seguir los siguientes pasos:
- En la consola, situarnos a nivel raíz de este proyecto.
- Correr el comando `npm install` para instalar los paquetes necesarios.
- Una vez instalados los paquetes corremos el comando `ng serve -o`

### Características principales
La aplicación:
- Simula autenticación: es decir que verifica *quién* soy.
- Maneja autorizaciones: luego de identificar al usuario, verifica qué acciones puede realizar.
- Proteje rutas a traves de `guards`: solo se podrá acceder a la ruta `/users` si el usuario se encuentra auténticado.
- Previene rutas innecesarias: también se utiliza un `guard` para que el usuario no pueda navegar a la ruta `/login` en caso de ya estar autenticado. 

### Credenciales de ingreso
- Para ingresar como administrador, ingresamos el nombre `admin` en el campo `username`. La contraseña es indiferente, podemos ingresar cualquiera.
- Para ingresar como usuario, ingresamos el nombre `user`en el campo `username`. Del mismo modo, la contraseña puede ser cualquiera.

### Roles
Se utilizan dos JSON Web Tokens simulados para otorgar permisos. 
- El correspondiente a `admin` permitirá que el usuario edite y adicione registros a la tabla.
- Por su lado, el rol `user` solo tendrá permiso de lectura.

### Notificaciones al usuario
Se utilizan `toasts` para comunicar al usuario sobre determinados eventos. A saber:
- Errores de formulario (en conjunto con pequeños mensajes debajo de cada input, por supuesto).
- Creación y edición exitosa de un registro.
- Ante errores de otras índoles. 

### Formularios
- Se utilizan Reactive Forms con sus `validators`. 
- Se emplea un `service` para mostrar dinámicamente texto de ayuda debajo de aquellos inputs que no pasen dichas validaciones. Esto para reducir *boilerplate* en el HTML y para un manejo centralizado y predecible.

### Estado global
Acorde a la consigna recibida, se empleó `Ngrx` para la verificación del estado de autenticación.

### Librerías
- PrimeNG para components.
- PrimeFlex para estilizar. Idealmente eligiría Tailwind, pero tiene conflictos con PrimeNG. Este inconveniente se solucionará con la versión 18 de PrimeNG, pero todavía está en beta.
- jwt-decode: para poder traducir los JSON Web Tokens.


Saludos 😃
