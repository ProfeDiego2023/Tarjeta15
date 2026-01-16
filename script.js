document.addEventListener("DOMContentLoaded", () => {

  /* ================== CONTADOR ================== */
  const fechaEvento = new Date("2026-02-28T00:00:00").getTime();

  setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia <= 0) return;

    document.getElementById("dias").innerText =
      Math.floor(distancia / (1000 * 60 * 60 * 24));

    document.getElementById("horas").innerText =
      Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutos").innerText =
      Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("segundos").innerText =
      Math.floor((distancia % (1000 * 60)) / 1000);
  }, 1000);

  /* ================== CARRUSEL ================== */
  let index = 0;
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");

  if (slides && dots.length > 0) {

    function mostrarSlide(i) {
      index = i;
      slides.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }

    setInterval(() => {
      index = (index + 1) % dots.length;
      mostrarSlide(index);
    }, 4000);

    let startX = 0;

    slides.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    slides.addEventListener("touchend", e => {
      let endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) {
        index = (index + 1) % dots.length;
      } else if (endX - startX > 50) {
        index = (index - 1 + dots.length) % dots.length;
      }
      mostrarSlide(index);
    });
  }

  
 /* ================== MÚSICA PRO ================== */
const audio = document.getElementById("musica");
const icon = document.getElementById("music-icon");
const btn = document.getElementById("musicBtn");

let reproduciendo = false;
audio.volume = 0;

function fadeIn() {
  let v = 0;
  const fade = setInterval(() => {
    if (v < 1) {
      v += 0.05;
      audio.volume = v;
    } else {
      clearInterval(fade);
    }
  }, 80);
}

function fadeOut() {
  let v = audio.volume;
  const fade = setInterval(() => {
    if (v > 0) {
      v -= 0.05;
      audio.volume = v;
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, 80);
}

window.toggleMusic = function () {
  if (!audio) return;

  if (!reproduciendo) {
    audio.play().then(() => {
      fadeIn();
      icon.textContent = "❚❚";
      btn.classList.add("playing");
      reproduciendo = true;
    }).catch(() => {
      console.log("El navegador bloqueó el audio hasta interacción válida");
    });
  } else {
    fadeOut();
    icon.textContent = "▶";
    btn.classList.remove("playing");
    reproduciendo = false;
  }
};


});
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const visiblePoint = 120;

    if (elementTop < windowHeight - visiblePoint) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
const form = document.getElementById("rsvp-form");
const respuesta = document.getElementById("respuesta");

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = new FormData(form);

  fetch("PEGAR_ACÁ_TU_URL_DE_GOOGLE_APPS_SCRIPT", {
    method: "POST",
    body: data
  })
  .then(() => {
    respuesta.innerHTML = "✨ Gracias por confirmar ✨";
    form.reset();
  })
  .catch(() => {
    respuesta.innerHTML = "❌ Error al enviar. Intentá nuevamente.";
  });
});
