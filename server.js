const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Inicializar el cliente de Supabase con las variables de entorno de Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta para guardar los datos
app.post('/api/guardar', async (req, res) => {
    const { usuario, contrasena } = req.body;

    // Validación básica de los datos
    if (!usuario || !contrasena) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    try {
        // Insertar el nuevo usuario en la tabla "usuarios" de Supabase
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ usuario, contrasena }])
            .select();

        if (error) {
            console.error('Error al insertar en Supabase:', error.message);
            return res.status(400).json({ error: error.message });
        }

        console.log('Usuario guardado en Supabase:', data);
        res.status(201).json({ status: 'success', message: 'Datos guardados correctamente', data: data[0] });

    } catch (err) {
        console.error('Error interno del servidor:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Exportar la app para que Vercel la maneje
module.exports = app;