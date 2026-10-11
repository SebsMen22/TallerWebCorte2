// --- 1. Lógica del Modo Oscuro ---
const btnTheme = document.getElementById('btnTheme');

btnTheme.addEventListener('click', () => {
    // Alterna la clase 'dark-mode' en el body
    document.body.classList.toggle('dark-mode');
    
    // Verifica si la clase existe para cambiar el texto del botón
    const isDarkMode = document.body.classList.contains('dark-mode');
    btnTheme.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
});

// --- 2. Lógica de los Contadores de Likes Independientes ---
const likeButtons = document.querySelectorAll('.btn-like');

likeButtons.forEach(button => {
    // Variable local para mantener el contador independiente de cada tarjeta
    let count = 0; 
    const countSpan = button.querySelector('.like-count');
    
    button.addEventListener('click', () => {
        count++;
        countSpan.textContent = count;
    });
});