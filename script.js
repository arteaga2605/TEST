document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        usuario: username,
        contrasena: password,
        fecha: new Date().toISOString()
    };

    fetch('/api/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos guardados:', data);
        alert('Conexión exitosa (Datos guardados en el servidor local)');
        document.getElementById('loginForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    });
});