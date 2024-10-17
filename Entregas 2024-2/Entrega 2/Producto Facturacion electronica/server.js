const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializa la aplicación Express
const app = express();

// Middleware
app.use(cors());  // Permitir solicitudes de otros dominios
app.use(bodyParser.json());  // Soporte para JSON en los cuerpos de las solicitudes

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',         // O '127.0.0.1'
    user: 'root',              // Usuario de MySQL
    password: '0000', // La contraseña de MySQL
    database: 'gestion_facturas' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para agregar un cliente
app.post('/clientes', (req, res) => {
    const { nombre, nit, direccion } = req.body;
    const query = 'INSERT INTO clientes (nombre, nit, direccion) VALUES (?, ?, ?)';

    db.query(query, [nombre, nit, direccion], (err, result) => {
        if (err) {
            console.error('Error al agregar cliente:', err);
            // Devolver JSON en caso de error
            res.status(500).json({ error: 'Error al agregar cliente' });
        } else {
            // Devolver JSON en caso de éxito
            res.status(200).json({ message: 'Cliente agregado correctamente' });
        }
    });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            // Devolver JSON en caso de error
            res.status(500).json({ error: 'Error al obtener clientes' });
        } else {
            // Devolver los resultados como JSON
            res.status(200).json(results);
        }
    });
});

// Ruta para eliminar un cliente por su ID
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clientes WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar cliente:', err);
            // Devolver JSON en caso de error
            res.status(500).json({ error: 'Error al eliminar cliente' });
        } else {
            // Devolver JSON en caso de éxito
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        }
    });
});

// Ruta para agregar una factura
app.post('/facturas', (req, res) => {
    const { cliente_id, producto, cantidad, precio, total } = req.body;
    const query = 'INSERT INTO facturas (cliente_id, producto, cantidad, precio, total) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [cliente_id, producto, cantidad, precio, total], (err, result) => {
        if (err) {
            console.error('Error al agregar factura:', err);
            // Devolver JSON en caso de error
            res.status(500).json({ error: 'Error al agregar factura' });
        } else {
            // Devolver JSON en caso de éxito
            res.status(200).json({ message: 'Factura agregada correctamente' });
        }
    });
});

// Ruta para obtener todas las facturas
app.get('/facturas', (req, res) => {
    const query = 'SELECT facturas.*, clientes.nombre AS cliente_nombre FROM facturas JOIN clientes ON facturas.cliente_id = clientes.id';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener facturas:', err);
            // Devolver JSON en caso de error
            res.status(500).json({ error: 'Error al obtener facturas' });
        } else {
            // Devolver los resultados como JSON
            res.status(200).json(results);
        }
    });
});

// Ruta para eliminar una factura por su ID
app.delete('/facturas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM facturas WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar factura:', err);
            // Devolver JSON en caso de error
            res.status(500).json({ error: 'Error al eliminar factura' });
        } else {
            // Devolver JSON en caso de éxito
            res.status(200).json({ message: 'Factura eliminada correctamente' });
        }
    });
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
