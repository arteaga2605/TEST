const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Depuración: Ver si Vercel está leyendo las variables
console.log("URL de Supabase cargada:", process.env.SUPABASE_URL ? "SÍ" : "NO");
console.log("Key de Supabase cargada:", process.env.SUPABASE_ANON_KEY ? "SÍ" : "NO");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/api/guardar', async (req, res) => {
    console.log("Datos recibidos en el servidor:", req.body); // Ver qué llega del formulario

    const { usuario, contrasena } = req.body;

    try {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ usuario, contrasena }])
            .select();

        if (error) {
            console.error('Error detallado de Supabase:', error); // Ver el error exacto
            return res.status(400).json({ error: error.message });
        }

        console.log('Usuario guardado exitosamente:', data);
        res.status(201).json({ status: 'success', message: 'Datos guardados correctamente', data: data[0] });

    } catch (err) {
        console.error('Error interno del servidor:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = app;