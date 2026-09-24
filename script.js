/* TEXTO DIGITANDO DUPLO (Frases Alternadas) */
const typing = document.getElementById("typing");

// Lista de frases para alternar
const phrases = [
  "Eu te amo ❤",
  "Pra sempre", 
  "Você é incrível",
  "Minha vida",
  "Meu chocolata branco",
  "Lindoca",
  "Meu céu estrelado ✨",
  "O brilho do meu universo 🌌"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typing.innerHTML = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 100;
  } else {
    typing.innerHTML = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

type();

/* MÚSICA */
const playBtn = document.getElementById("playBtn");
const music = new Audio("CBJ.mp3");

music.loop = true;
music.volume = 0;

let isPlaying = false;

/* FADE IN DO VOLUME (Mais suave e lento) */
function fadeInMusic() {
  let vol = 0;
  music.volume = 0;
  
  const fade = setInterval(() => {
    if (vol < 0.3) {
      vol += 0.01;
      music.volume = Math.min(vol, 0.3);
    } else {
      clearInterval(fade);
    }
  }, 400); 
}

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    fadeInMusic();

    setTimeout(() => {
      document.body.classList.add("mood-shift");
    }, 500);

    playBtn.textContent = "⏸️";
    playBtn.classList.add("playing");

    setTimeout(() => {
      const surprise = document.getElementById("surprise");
      surprise.classList.add("show");
    }, 9000); 
  } else {
    music.pause();
    playBtn.textContent = "🎵";
    playBtn.classList.remove("playing");
    document.body.classList.remove("mood-shift");
    document.body.classList.remove("beat-pulse");
  }
  isPlaying = !isPlaying;
});

/* CORAÇÕES / ESTRELAS CAINDO COM AS CORES FAVORITAS */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  
  const symbols = ["💙", "❤️", "💜", "💚", "✨", "💫"];
  heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 500);

/* MENSAGENS ROMÂNTICAS E BRILHO AO CLICAR (Apenas fora da caixa) */
const romanticPhrases = [
  "Sempre você 💙",
  "Meu porto seguro ✨",
  "Te amo tanto ❤️",
  "Em todas as vidas 💜",
  "Você é minha paz 💚",
  "Amor infinito 💫",
  "Minha lua 🌙"
];

document.addEventListener("click", (e) => {
  const container = document.querySelector(".container");
  
  if (container && container.contains(e.target)) {
    return;
  }

  const spark = document.createElement("div");
  spark.classList.add("spark");
  
  spark.textContent = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
  
  spark.style.position = "absolute";
  spark.style.left = e.clientX + "px";
  spark.style.top = e.clientY + "px";
  spark.style.color = "#ffffff";
  spark.style.fontFamily = "'Great Vibes', cursive";
  spark.style.fontSize = "1.6rem";
  spark.style.pointerEvents = "none";
  spark.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)";
  spark.style.whiteSpace = "nowrap";
  spark.style.zIndex = "9999";
  
  spark.style.animation = "sparkFadeAnim 2s ease forwards";

  document.body.appendChild(spark);

  setTimeout(() => {
    spark.remove();
  }, 2000);
});

/* ACESSIBILIDADE */
playBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    playBtn.click();
  }
});

/* MOMENTO EXATO DA BATIDA / DROP (Corrigido para 25.08s) */
const momentoDaBatida = 25.08; 

music.addEventListener("timeupdate", () => {
  if (isPlaying && music.currentTime >= momentoDaBatida) {
    document.body.classList.add("beat-pulse");
  } else {
    document.body.classList.remove("beat-pulse");
  }
});
