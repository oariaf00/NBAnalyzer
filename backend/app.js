const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const port = 3000;
const ruta = "http://localhost:3000"
var cors = require("cors");
const neo4j = require("neo4j-driver");
const driver = neo4j.driver( "bolt://localhost:7687", neo4j.auth.basic("neo4j", "nbanalyzer"));
const session = driver.session();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/lookPlayers", function(req, res) {
  console.log("He llegado al método de /Players en app.js");
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
  console.log(query);
  var lista=[]
  const resultPromise = session.run(query).subscribe({
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
      //session.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA BUSCAR EN BASE AL ESTILO DEL JUGADOR
app.get("/recommended", function(req, res) {
  console.log("He llegado al método de stylePlayers en app.js");
  console.log(req.query.estilo)
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (p:Player) "
  if(req.query.estilo=="3-And-D"){
    query+="where p.threep>0.34 and p.robos_pp>1 and p.rebotes_defensivos>4  RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.threep, p.robos_pp DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Playmaker"){
    query+="where exists(p.asistencias_pp) RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.asistencias_pp DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Defensive Player"){
    query+="where exists(p.robos_pp) RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.robos_pp DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Defensive rebounder"){
    query+="where exists(p.rebotes_defensivos) RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.rebotes_defensivos DESC limit "+req.query.numJugadores+""
  }else if(req.query.estilo=="Offensive rebounder"){
    query+="where exists(p.rebotes_ofensivos) RETURN p.nombre, p.edad, p.posicion, p.equipo, p.salario, p.puntos_pp, p.rebotes_pp, p.rebotes_ofensivos, p.rebotes_defensivos, p.robos_pp, p.perdidas_pp, p.asistencias_pp, p.fg, p.ft, p.threep, p.faltas_pp ORDER BY p.rebotes_ofensivos DESC limit "+req.query.numJugadores+""
  }
  console.log(query);
  var lista=[]
  const resultPromise = session.run(query).subscribe({
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
      //session.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

app.listen(port, function() {
  console.log("NBAnalyzer funcionando en el puerto: " + 3000);
});
