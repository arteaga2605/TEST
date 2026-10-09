const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para leer JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static(__dirname));

// Ruta para guardar los datos
app.post('/api/guardar', (req, res) => {
    const nuevosDatos = req.body;
    const archivoJson = path.join(__dirname, 'credenciales.json');

    let datosExistentes = [];

    // Leer el archivo si ya existe
    if (fs.existsSync(archivoJson)) {
        const contenido = fs.readFileSync(archivoJson, 'utf8');
        try {
            datosExistentes = JSON.parse(contenido);
        } catch (e) {
            datosExistentes = [];
        }
    }

    // Agregar el nuevo registro
    datosExistentes.push(nuevosDatos);

    // Escribir el archivo JSON
    fs.writeFileSync(archivoJson, JSON.stringify(datosExistentes, null, 2), 'utf8');

    console.log('Nuevo registro guardado:', nuevosDatos);
    res.json({ status: 'success', message: 'Datos guardados correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});