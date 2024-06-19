/*
    TENDRÁ LOS CAMBIOS MÁS IMPORTANTES
    Y ES EL QUE HARÁ EL TRATAMIENTO DE LA INFORMACIÓN.
*/

// 1 -  Exportamos los módulos necesarios
const express = require("express");
const db = require("../db/db");

// 2 - Creamos las peticiones
// Saludo
const saludo = (req, res) => {
    res.json({ mensaje: "Hola desde la ruta de LUMINOVA" });
};

// Petición para CREAR USUARIO
const createUser = (req, res) => {
    // Clave string que usara MySQL
    const sql = "INSERT INTO `colegio-luminova`.alumno (doc, nombre, apellido, nacimiento, calle, num_calle, ciudad, cp, escolaridad, clave, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Datos arbitrarios para realizar la prueba
    const doc = 41752175;
    const nombre = "Agustina";
    const apellido = "Velazquez";
    const nacimiento = "1999-02-23";
    const calle = "Pueyrredón";
    const num_calle = 475;
    const ciudad = "Morón";
    const cp = 1708;
    const escolaridad = "Nivel Primario";
    const clave = "hola1234";
    const correo = "agus@correo.com"

    // Con el método .query que proporciona mysql2 generamos la sentenfcia que enviaremos a la BBDD MySql
    db.query(sql, [doc, nombre, apellido, nacimiento, calle, num_calle, ciudad, cp, escolaridad, clave],(err, result) => {
        if (err) throw err;
        res.json({message: "Usuario creado con éxito!", alumnoID: result.insertId});
    })
};

// Petición para INICIAR SESIÓN
const acceder  = (req, res) => {
    // Extraemos de la URL el n° de doc y clave que ingrese el usuario
    const { doc, clave } = req.params;

    // Clave que usará MySQL
    // CLAVE QUE MUESTRA TODO EL REGISTRO
    const sql = "SELECT * FROM `colegio-luminova`.alumno WHERE doc = ? AND clave = ?;"

    // Mostramos los datos del alumno encontrado
    db.query(sql, [doc, clave], (err, result) => {
        // Si el usuario no es compatible con esos datos
        if (err) throw err;
        // Sino, muestra el registro
        res.json({message: "¡Inicio de Sesión con éxito!"})
    });
};

// Petición para INSCRIPCIÓN A CURSO
// router.post();

// Petición para VER INSCRIPCIONES
// router.get();

// Petición para ELIMINAR INSCRIPCIÓN
// router.delete();

// Petición para EDITAR DATOS DE USUARIO

// 3 - Exportamos las peticiones a utilizar
module.exports = {
    saludo,
    createUser,
    acceder
};