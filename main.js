const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

// 1. Define aquí tus canciones en orden
const playlist = ["/musica/LOS PARRAS- PARA QUE LO NOTES (VIDEO OFICIAL) - Los Parras.mp3", "/musica/BANNERS - Someone To You  Lyrics, español - Half-blood.mp3", "/musica/Por Verte Feliz - Los parras.mp3"];
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

document.addEventListener("click", startAutoMusic);
document.addEventListener("scroll", startAutoMusic);
document.addEventListener("touchstart", startAutoMusic);
