# TPY1101-002D-FULLSTACK

Repositorio oficial de la Evaluación Diagnóstica Full Stack.

## Objetivo

Desarrollar una aplicación web Full Stack que permita:

* Login de acceso mediante usuario y contraseña.
* Listar usuarios.
* Crear usuarios.
* Modificar usuarios.
* Eliminar usuarios.

Tecnologías requeridas:

* Frontend: React
* Backend: Spring Boot
* Base de Datos: Oracle, PostgreSQL, MySQL o equivalente.

---

## Estructura del Proyecto

```text
/frontend
/backend
/database
README.md
```

---

## Inicio de la Actividad

### 1. Crear un Fork del Repositorio

Desde GitHub, presione el botón **Fork** para crear una copia del repositorio en su cuenta personal.

Ejemplo:

Repositorio original:

```text
https://github.com/rodolfogonzaleza/TPY1101-002D-FULLSTACK
```

Fork del alumno:

```text
https://github.com/USUARIO_GITHUB/TPY1101-002D-FULLSTACK
```

---

### 2. Clonar el Fork

```bash
git clone https://github.com/USUARIO_GITHUB/TPY1101-002D-FULLSTACK.git
```

Ingresar al proyecto:

```bash
cd TPY1101-002D-FULLSTACK
```

---

### 3. Crear una Rama de Trabajo

Cada dupla deberá crear una rama basada en `main` utilizando el siguiente formato:

```text
NombreAlumno1-NombreAlumno2
```

Ejemplo:

```bash
git checkout -b JuanPerez-MariaSoto
```

Verificar rama actual:

```bash
git branch
```

---

## Reglas

Cada dupla deberá:

1. Crear una rama propia basada en `main`.
2. Desarrollar la solución sobre dicha rama.
3. Realizar commits periódicos durante el desarrollo.
4. Subir periódicamente los avances al repositorio GitHub.
5. Entregar el trabajo completamente publicado en GitHub.

### Guardar Cambios

```bash
git add .
git commit -m "avance proyecto"
```

### Subir Rama por Primera Vez

```bash
git push -u origin NombreAlumno1-NombreAlumno2
```

### Subidas Posteriores

```bash
git push
```

---

## Consideraciones Importantes

* La evaluación tiene una duración máxima de 120 minutos.
* Esta actividad tiene carácter diagnóstico y no afecta las calificaciones de la asignatura.
* Está permitido el uso de herramientas de Inteligencia Artificial como apoyo.
* No se debe trabajar directamente sobre la rama `main`.
* No se debe subir la carpeta `node_modules`.
* No se deben subir archivos compilados ni carpetas generadas automáticamente por las herramientas de desarrollo.
* Se recomienda realizar commits frecuentes durante el desarrollo.

---

## Entrega

Al finalizar la evaluación deberán entregar:

* URL del repositorio GitHub (Fork).
* Nombre de la rama utilizada.
* Nombre de los integrantes de la dupla.
* adjuntar Archivo .ZIP de la rama creada

* Evidencia fotográfica de:

  * Pantalla de Inicio de Sesión.
  * Pantalla de Listado de Usuarios.
  * Pantalla de Creación de Usuario.
  * Pantalla de Actualización de Usuario.
  * Pantalla de Eliminación de Usuario.
* Enviar toda la información al correo electrónico que será informado durante la actividad.

---

## README.md del Proyecto Entregado

El proyecto desarrollado deberá incluir un README propio con:

* Explicación técnica breve de la solución.
* Instrucciones de instalación.
* Dependencias utilizadas.
* Puertos utilizados.
* Ejecución del frontend.
* Ejecución del backend.
* Configuración de la base de datos.
* Script de creación de tablas (si corresponde).
* Credenciales de prueba.
* Integrantes de la dupla.

```
1. Explicación técnica breve de la solución.
El presente projecto presenta una solucion basica para un sistema de auth y usuarios,
basandose en el envio de jwt para la autenticacion.
2. Instrucciones de instalación
    Requisitos
        Java 21
        Maven 3.9 o superior
        Git
        Node.js 25
    i. clonar projecto
    ii. instalar dependencias del back
        mvn clean install
    iii. ejecutar el back 
        mvn spring-boot:run
3. Dependencias ejecutadas
    back:
        Spring Boot 4.x
        Spring Web MVC
        Spring Security
        Spring Data JPA
        H2 Database
        JJWT 0.11.5
        Lombok
        JWT (JSON Web Token)
        BCryptPasswordEncoder
        Hibernate
        Spring Data JPA
4. Puertos utilizados
    backend:
        8080
        
5. configuracion base de datos
    Parámetros de conexión:
        Motor:	H2 Database
        URL	jdbc: h2:mem:testdb
        Usuario:sa
        Contraseña	(vacía)
  
6. Integrantes de la dupla
    Alvaro Vasquez
    Jose Valenzuela
        
        

```
