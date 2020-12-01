const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const port = 3000;
const ruta = "http://localhost:3000"
var cors = require("cors");
const neo4j = require("neo4j-driver");
const driver = neo4j.driver( "bolt://localhost:7687", neo4j.auth.basic("neo4j", "nbanalyzer"));
//const session = driver.session();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/lookPlayers", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) WHERE p.posicion='"+req.query.posicion+"'"
  if(req.query.edad!=undefined){
    query+=" AND p.posicion='"+req.query.posicion+"'"
  }
  if(req.query.fg!=undefined){
    query+= " AND p.fg>"+req.query.fg+""
  }
  if(req.query.threep!=undefined){
    query+= " AND p.threep>"+req.query.threep+""
  }
  if(req.query.ft!=undefined){
    query+= " AND p.ft>"+req.query.ft+""
  }
  if(req.query.puntos!=undefined){
    query+= " AND p.puntos_pp>"+req.query.puntos+""
  }
  if(req.query.rebotes!=undefined){
    query+= " AND p.rebotes_pp>"+req.query.rebotes+""
  }
  if(req.query.asistencias!=undefined){
    query+= " AND p.asistencias_pp>"+req.query.asistencias+""
  }
  query+=" RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.valoracion DESC"
  var lista=[]
  const consultaFiltro= driver.session();
  consultaFiltro.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
        lista.push(result.get(1));
        lista.push(result.get(2));
        lista.push(result.get(3));
        lista.push(result.get(4));
        lista.push(result.get(5));
        lista.push(result.get(6));
        lista.push(result.get(7));
        lista.push(result.get(8));
        lista.push(result.get(9));
        lista.push(result.get(10));
        lista.push(result.get(11));
        lista.push(result.get(12));
        lista.push(result.get(13));
        lista.push(result.get(14));
        lista.push(result.get(15));
    },
    onCompleted: function() {
      res.send(lista);
      consultaFiltro.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE TRIPLES DE LOS JUGADORES
app.get("/avg3p", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) return avg(p.threep)"
  var lista=[]
  const consultaTriples = driver.session();
  consultaTriples.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      consultaTriples.close();
      res.send(lista);
      
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE ROBOS DE LOS JUGADORES
app.get("/avgRobos", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) where p.posicion='SF' or p.posicion='SG' or p.posicion='PG' return avg(p.robos_pp)"
  var lista=[]
  const consultaRobos = driver.session();
  consultaRobos.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      consultaRobos.close();
      res.send(lista);
      
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE ROBOS DE LOS JUGADORES
app.get("/avgRebotesDef", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) where p.posicion='PF' or p.posicion='C' return avg(p.rebotes_defensivos)"
  var lista=[]
  const consultaRebotesDef = driver.session();
  consultaRebotesDef.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      res.send(lista);
      consultaRebotesDef.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE ASISTENCIAS DE UN BASE
app.get("/avgAsistencias", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) where p.posicion='PG' return avg(p.asistencias_pp)"
  var lista=[]
  const consultaAsistencias = driver.session();
  consultaAsistencias.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      res.send(lista);
      consultaAsistencias.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE PUNTOS DE UN BASE/ESCOLTA
app.get("/avgPuntos", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) where p.posicion='PG' or p.posicion='SG' return avg(p.puntos_pp)"
  var lista=[]
  const consultaPuntos = driver.session();
  consultaPuntos.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      res.send(lista);
      consultaPuntos.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE PUNTOS DE UN BASE/ESCOLTA
app.get("/avgTapones", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) where p.posicion='SF' or p.posicion='PF' or p.posicion='C' return avg(p.tapones_pp)"
  var lista=[]
  const consultaTapones = driver.session();
  consultaTapones.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      res.send(lista);
      consultaTapones.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE REBOTES
app.get("/avgRebotes", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) where p.posicion='PF' or p.posicion='C' return avg(p.rebotes_pp)"
  var lista=[]
  const consultaRebotes = driver.session();
  consultaRebotes.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      res.send(lista);
      consultaRebotes.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA BUSCAR EN BASE AL ESTILO DEL JUGADOR
app.get("/recommended", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) "
  if(req.query.estilo=="3&D"){
    query+="where 0.7> p.threep >"+req.query.avg3p+" and p.robos_pp>"+req.query.avgRobos+" and p.rebotes_defensivos>"+req.query.avgRebotesDef+" and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.threep DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Playmaker"){
    query+="where p.asistencias_pp>"+req.query.avgAsistencias+" and p.puntos_pp>"+req.query.avgPuntos+" and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.asistencias_pp DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Defensive Player"){
    query+="where p.robos_pp>"+req.query.avgRobos+" and p.rebotes_defensivos>"+req.query.avgRebotesDef+" and p.tapones_pp>"+req.query.avgTapones+" and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.robos_pp DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Defensive rebounder"){
    query+="where exists(p.rebotes_defensivos) and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.rebotes_defensivos DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Offensive rebounder"){
    query+="where exists(p.rebotes_ofensivos) and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.rebotes_ofensivos DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="All-around player"){
    //Si es base o escolta hacemos una búsqueda determinada
    if(req.query.posicion=='PG' || req.query.posicion=='SG'){
      query+="where p.rebotes_pp>"+req.query.avgRebotes+" and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.valoracion DESC limit "+req.query.numJugadores+""
    }
    //Si es alero, ala-pivot o pivot hacemos otra búsqueda
    else{
      query+="where p.asistencias_pp>"+req.query.avgAsistencias+" and p.puntos_pp>"+req.query.avgPuntos+" and p.posicion='"+req.query.posicion+"' RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.asistencias_pp DESC limit "+req.query.numJugadores+""
    }
  }
  var lista=[]
  const consultaRecomendados = driver.session();
  consultaRecomendados.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
        lista.push(result.get(1));
        lista.push(result.get(2));
        lista.push(result.get(3));
        lista.push(result.get(4));
        lista.push(result.get(5));
        lista.push(result.get(6));
        lista.push(result.get(7));
        lista.push(result.get(8));
        lista.push(result.get(9));
        lista.push(result.get(10));
        lista.push(result.get(11));
        lista.push(result.get(12));
        lista.push(result.get(13));
        lista.push(result.get(14));
        lista.push(result.get(15));
    },
    onCompleted: function() {
      res.send(lista);
      consultaRecomendados.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

app.listen(port, function() {
  console.log("NBAnalyzer funcionando en el puerto: " + 3000);
});
