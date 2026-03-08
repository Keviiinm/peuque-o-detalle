const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

// 1. Define aquí tus canciones en orden
const playlist = ["musica/ParaQueLoNotes.mp3", "musica/PorVerteFeliz.mp3", "musica/SomeoneToYou.mp3"];
let currentSongIndex = 0;
let hasStarted = false;

// Cargar la primera canción al iniciar
music.src = playlist[currentSongIndex];

function toggleMusic() {
  if (music.paused) {
    music.play();
    btn.classList.add("playing");
  } else {
    music.pause();
    btn.classList.remove("playing");
    hasStarted = true;
  }
}

// EL TRUCO: Detectar cuando termina una canción
music.addEventListener("ended", function () {
  currentSongIndex++; // Pasamos a la siguiente

  if (currentSongIndex < playlist.length) {
    music.src = playlist[currentSongIndex];
    music.play();
    btn.classList.add("playing");
  } else {
    // Si quieres que vuelva a empezar desde la primera al terminar todo:
    currentSongIndex = 0;
    music.src = playlist[currentSongIndex];
    music.play();
  }
});

// Iniciar con la primera interacción (Scroll o Click)
function startAutoMusic() {
  if (!hasStarted && music.paused) {
    music
      .play()
      .then(() => {
        btn.classList.add("playing");
        hasStarted = true;
      })
      .catch((error) => console.log("Esperando interacción..."));
  }
}


function handleVideoPlay() {
    const video = document.getElementById('recap-video');
    const frame = document.querySelector('.netflix-style');
    const music = document.getElementById('bg-music'); // Tu música de fondo

    if (video.paused) {
        // 1. Pausar la música de fondo para escuchar el video (opcional)
        if (music) music.pause();
        document.getElementById('music-btn').classList.remove('playing');

        // 2. Reproducir video
        video.play();
        frame.classList.add('is-playing');
        video.controls = true; // Mostramos controles nativos una vez que inicia
    } else {
        video.pause();
        frame.classList.remove('is-playing');
    }
}

// Si el video termina solo, volvemos a mostrar el botón de play
document.getElementById('recap-video').addEventListener('ended', function() {
    document.querySelector('.netflix-style').classList.remove('is-playing');
    this.controls = false;
});



document.addEventListener("click", startAutoMusic);
document.addEventListener("scroll", startAutoMusic);
document.addEventListener("touchstart", startAutoMusic);
