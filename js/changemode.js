document.addEventListener('DOMContentLoaded', () => {
    let boton_modo = document.getElementById('cambio-modo');
    let body = document.body;

    boton_modo.addEventListener('click', () => {
        if (body.className == 'light-mode') {
            body.className = 'dark-mode';
        } else {
            body.className = 'light-mode';
        }
        localStorage.setItem('modo', body.className);
    });

    const modoGuardado = localStorage.getItem('modo');
    if (modoGuardado) {
        body.className = modoGuardado;
    }
});


