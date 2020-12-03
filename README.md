# NBAnalyzer
Sistema de recomendación desarrollado para la asignatura de Sistemas de Información de gestión y business inteligence que consiste en una aplicación de recomendación de fichajes basada en una serie de parámetros introducidos por el usuario.

# INSTRUCCIONES PARA ARRANCAR LA APLICACIÓN
Primero, deberá tener instalado en su equipo el software Neo4j Desktop para la carga de la base de datos, y la tecnología NODE JS para arrancar la parte del "Backend".

# INSTRUCCIONES CREACIÓN DE BASE DE DATOS:
-> Abrir el software Neo4j Desktop, una vez dentro crear un proyecto nuevo.

-> Crear una base de datos local en ese proyecto llamada NBAnalyzer, y con contraseña nbanalyzer. En cuanto a la versión, esta aplicación ha sido desarrollada con la versión 4.1.4. Es recomendable usar esta versión, de lo contrario, no se asegura su funcionalidad.

-> Una vez creada, arriba a la derecha encontrará un botón identificado con 3 puntos. Tras pulsarlo, entrará en la opción manage, y luego en la flecha que se encuentra a la derecha del botón 'Open folder', escogiendo ahora la opción de import. De forma inmediata se abrirá una ventana del explorador de archivos con un directorio dentro de Neo4j donde se copiará y pegará el archivo .csv de la base de datos que se encuentra en la carpeta BBDD del proyecto.

-> Una vez realizado el paso anterior, cerrar el explorador de archivos y arrancar la base de datos en el botón 'Start' y pulsamos el botón 'Open' para que se abra el Neo4j Browser y podamos ejecutar los comandos siguientes:

  -> Para cargar los datos a la base desde el CSV: 
```
LOAD CSV WITH HEADERS FROM 'file:///nba-stats-salary-rating.csv' AS line
WITH line LIMIT 450
CREATE (p:Player { nombre: line.Player, valoracion: toInteger(right(line.Ratings, 4)), salario: line.Salaries, posicion: line.Pos, edad: line.Age, equipo: line.Tm, partidos_jugados: line.G, partidos_titular: line.GS, minutos_pp: toFloat(line.MP), fg: toFloat(line.FGp), threep: toFloat(line.threePp), ft: toFloat(line.FTp), rebotes_ofensivos: toFloat(line.ORB), rebotes_defensivos: toFloat(line.DRB), rebotes_pp: toFloat(line.TRB), asistencias_pp: toFloat(line.AST), robos_pp: toFloat(line.STL), tapones_pp: toFloat(line.BLK), perdidas_pp: toFloat(line.TOV), faltas_pp: toFloat(line.PF), puntos_pp: toFloat(line.PTS), twop: toFloat(line.twoPp)})

MERGE (t:Team {name: line.Tm})
CREATE (p)-[:BELONGS]->(t)
```

-> Cuando hayamos hecho este paso ya dispondremos de la base de datos íntegra para poder ejecutar el programa


# INSTRUCCIONES BACKEND:

Primero deberá entrar a la carpeta del backend desde la terminal, e instalar todos los componentes de la aplicación mediante el siguiente comando (Este proceso puede demorarse un poco):

```
npm install
```

Una vez tengamos esto, procederemos a abrir la carpeta del backend, donde debemos ejecutar el siguiente comando para arrancar el proyecto:

```
node app.js
```
O en su defecto,
```
nodemon app.js
```

Una vez tengamos el backend arrancado, procederemos a arrancar el frontend.


# INSTRUCCIONES FRONTEND:

Primero deberá entrar a la carpeta del backend desde otro terminal distinto al anterior, e instalar todos los componentes de la aplicación mediante el siguiente comando (Este proceso puede demorarse un poco):

```
npm install
```

Una vez realizado el paso anterior, para arrancar la aplicación simplemente se deberá ejecutar el siguiente comando:

```
npm run electron:serve
```

Deberá esperar a que arranque la aplicación unos segundos, y una vez que acabe su construcción arrancará de forma automática. Alguno de los procesos descritos anteriormente puede demorarse debido a la conexión de su dispositivo a internet o la capacidad de procesamiento de su ordenador.

