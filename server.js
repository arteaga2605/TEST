const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/guardar', (req, res) => {
    const nuevosDatos = req.body;
    // ⚠️ IMPORTANTE: En Vercel solo se puede escribir en /tmp
    const archivoJson = path.join('/tmp', 'credenciales.json'); 

    let datosExistentes = [];

    if (fs.existsSync(archivoJson)) {
        const contenido = fs.readFileSync(archivoJson, 'utf8');
        try {
            datosExistentes = JSON.parse(contenido);
        } catch (e) {
            datosExistentes = [];
        }
    }

    datosExistentes.push(nuevosDatos);

    try {
        fs.writeFileSync(archivoJson, JSON.stringify(datosExistentes, null, 2), 'utf8');
        res.json({ status: 'success', message: 'Datos guardados correctamente' });
    } catch (error) {
        console.error("Error escribiendo archivo:", error);
        res.status(500).json({ status: 'error', message: 'No se pudo guardar' });
    }
});

// ❌ NO USES app.listen() EN VERCEL
// app.listen(PORT, () => { ... });

// ✅ EXPORTA LA APP
module.exports = app;