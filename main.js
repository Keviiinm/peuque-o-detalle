const music = document.getElementById('bg-music');
const control = document.querySelector('.music-control');

function toggleMusic() {
    if (music.paused) {
        music.play();
        control.classList.add('playing');
    } else {
        music.pause();
        control.classList.remove('playing');
    }
}

// Iniciar música al primer toque en la pantalla por seguridad
document.addEventListener('click', () => {
    if (music.paused && !control.classList.contains('manual-stop')) {
        music.play();
        control.classList.add('playing');
    }
}, { once: true });

// Si ella lo para manualmente, no se reinicia sola
control.addEventListener('click', () => {
    control.classList.add('manual-stop');
});