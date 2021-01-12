const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar ',err)
      })
} // Termina guardarDB

const getListado = () =>{
    cargarDB();
    return listadoPorHacer;
} // Termina getListado

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');   
    } catch (error) {
        console.log(error);
        listadoPorHacer = [];
    }
    
} // Termina cargarDB

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

} // Termina crear

const actualizar = (descripcion, completado = true) => {
    
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);
    
    if( index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    else {
        return false;
    }
} // Termina actualizar

const borrar = (descripcion) => {
    
    cargarDB();
    let nvoListado = listadoPorHacer.filter( tarea =>  tarea.descripcion !== descripcion);
    if(nvoListado.length === listadoPorHacer.length)
    {
        return false;
    } else {
        listadoPorHacer = nvoListado;
        guardarDB();
        return true;
    }
} // Termina borrar

module.exports ={
    crear,
    getListado,
    actualizar,
    borrar
}



