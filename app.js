//----------------Integrantes----------------
// Sebastian Meneses Molina 2240311 Estudiante A
// Julian Sanchez Pasaje 2235586 Estudiante B

// --------- Lógica Modo Oscuro ---------
const btnTheme = document.getElementById('btnTheme');

btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    btnTheme.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
});

// --------- Logica Contadores likes
const likeButtons = document.querySelectorAll('.btn-like');

likeButtons.forEach(button => {   // variable para mantenerr el conteo de likes aparte
    let count = 0;
    const countSpan = button.querySelector('.like-count');

    button.addEventListener('click', () => {
        count++;
        countSpan.textContent = count;
    });
});

// --------- Formulario, DOM y Librerías CDN 

const formFeedback = document.getElementById('formFeedback');
const inputAutor = document.getElementById('autor');
const selectProyecto = document.getElementById('proyecto');
const textareaComentario = document.getElementById('comentario');
const comentariosContainer = document.getElementById('comentariosContainer');
const sinComentarios = document.getElementById('sinComentarios');

// Longitudes mínimas requeridas
const MIN_AUTOR = 3;
const MIN_COMENTARIO = 10;

// Estilos de los modales según el tema actual (claro/oscuro)
function opcionesTema() {
    const oscuro = document.body.classList.contains('dark-mode');
    return oscuro
        ? { background: '#2d3748', color: '#edf2f7' }
        : { background: '#ffffff', color: '#2d3748' };
}

// Valida los campos y devuelve { errores, primerCampoInvalido }
function validarFormulario(autor, proyecto, comentario) {
    const errores = [];
    let primerCampoInvalido = null;

    const marcar = (campo, mensaje) => {
        errores.push(mensaje);
        if (!primerCampoInvalido) primerCampoInvalido = campo;
    };

    // Nombre: obligatorio, longitud mínima y solo letras/espacios
    if (autor === '') {
        marcar(inputAutor, 'El nombre es obligatorio.');
    } else if (autor.length < MIN_AUTOR) {
        marcar(inputAutor, `El nombre debe tener al menos ${MIN_AUTOR} caracteres.`);
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'.-]+$/.test(autor)) {
        marcar(inputAutor, 'El nombre solo puede contener letras y espacios.');
    }

    // Proyecto: debe haberse seleccionado una opción
    if (proyecto === '') {
        marcar(selectProyecto, 'Debes seleccionar un proyecto.');
    }

    // Comentario: obligatorio y longitud mínima
    if (comentario === '') {
        marcar(textareaComentario, 'El comentario es obligatorio.');
    } else if (comentario.length < MIN_COMENTARIO) {
        marcar(
            textareaComentario,
            `El comentario debe tener al menos ${MIN_COMENTARIO} caracteres (llevas ${comentario.length}).`
        );
    }

    return { errores, primerCampoInvalido };
}

// Comentario con createElement y agrega con apendChild
function agregarComentario(autor, proyecto, comentario) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('comment-card');

    const titulo = document.createElement('h4');
    titulo.textContent = `${autor} sobre "${proyecto}"`;

    const texto = document.createElement('p');
    texto.textContent = comentario;

    const fecha = document.createElement('small');
    fecha.classList.add('empty-msg');
    fecha.textContent = new Date().toLocaleString('es-CO');

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(texto);
    tarjeta.appendChild(fecha);

    comentariosContainer.appendChild(tarjeta);

    // Mensaje de lista vacía
    sinComentarios.style.display = 'none';
}

formFeedback.addEventListener('submit', (event) => {
    // Evita la recarga de la página
    event.preventDefault();

    const autor = inputAutor.value.trim();
    const proyecto = selectProyecto.value;
    const comentario = textareaComentario.value.trim();

    const { errores, primerCampoInvalido } = validarFormulario(autor, proyecto, comentario);

    // Si hay errores: modal de SweetAlert2 y foco en el primer campo inválido
    if (errores.length > 0) {
        const lista = errores.map(e => `<li>${e}</li>`).join('');

        Swal.fire({
            icon: 'error',
            title: 'Revisa el formulario',
            html: `<ul style="text-align:left; padding-left:20px;">${lista}</ul>`,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3182ce',
            ...opcionesTema()
        }).then(() => {
            if (primerCampoInvalido) primerCampoInvalido.focus();
        });

        return;
    }

    // Todo válido
    agregarComentario(autor, proyecto, comentario);
    formFeedback.reset();

    // Modal de éxito
    Swal.fire({
        icon: 'success',
        title: '¡Valoración publicada!',
        text: 'Gracias por compartir tu opinión.',
        confirmButtonText: 'Genial',
        confirmButtonColor: '#3182ce',
        ...opcionesTema()
    });

    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
});


// =====================================================================
// --------- NUEVAS ANIMACIONES AÑADIDAS SIN TOCAR LO ANTERIOR ---------
// =====================================================================

likeButtons.forEach(button => {
    button.addEventListener('click', (evento) => {
        // 1. Transición suave (efecto latido) en el botón
        button.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.15)' },
            { transform: 'scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-in-out'
        });

        // 2. Lógica para el corazón rojo flotante
        const corazonFlotante = document.createElement('span');
        corazonFlotante.textContent = '❤️';
        
        // Estilos para que se posicione y no interrumpa clics
        corazonFlotante.style.position = 'fixed';
        corazonFlotante.style.fontSize = '28px';
        corazonFlotante.style.pointerEvents = 'none';
        corazonFlotante.style.zIndex = '9999';

        // Posicionar el emoji exactamente donde el usuario hizo clic
        corazonFlotante.style.left = `${evento.clientX - 15}px`;
        corazonFlotante.style.top = `${evento.clientY - 20}px`;

        document.body.appendChild(corazonFlotante);

        // Animar el corazón subiendo y desapareciendo
        const animacionCorazon = corazonFlotante.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-60px) scale(1.5)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        });

        // Eliminar el corazón del HTML cuando la animación termine
        animacionCorazon.onfinish = () => {
            corazonFlotante.remove();
        };
    });
});