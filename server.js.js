const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Depuración: Ver si Vercel está leyendo las variables de entorno
console.log("URL de Supabase cargada:", process.env.SUPABASE_URL ? "SÍ" : "NO");
console.log("Key de Supabase cargada:", process.env.SUPABASE_ANON_KEY ? "SÍ" : "NO");

// Usar variables de entorno o los valores por defecto proporcionados
const supabaseUrl = process.env.SUPABASE_URL || 'https://gvtmtwsrxuwxgpqgxvht.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dG10d3NyeHV3eGdwcWd4dmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTE0OTMsImV4cCI6MjEwNzQ2NzQ5M30.NFSYU26URv0tr5tx51BrcXc9aT8dRm95WgrmkFKI6-M';

const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/api/guardar', async (req, res) => {
    console.log("Datos recibidos en el servidor:", req.body);

    const { usuario, contrasena } = req.body;

    try {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ usuario, contrasena }])
            .select();

        if (error) {
            console.error('Error detallado de Supabase:', error);
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