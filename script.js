document.addEventListener("DOMContentLoaded", () => {

  /* ================== CONTADOR ================== */
  const fechaEvento = new Date("2026-02-28T21:00:00").getTime();

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");
  const mensajeEl = document.getElementById("mensaje-contador");
  const contadorEl = document.getElementById("contador");

  function actualizarContador() {
    if (!diasEl || !horasEl || !minutosEl || !segundosEl) return;

    const ahora = Date.now();
    const distancia = fechaEvento - ahora;

    if (distancia <= 0) {
      contadorEl.style.display = "none";
      mensajeEl.textContent = "🎉 ¡Ya estamos festejando! 🎉";
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((distancia / (1000 * 60)) % 60);
    const segundos = Math.floor((distancia / 1000) % 60);

    diasEl.textContent = dias;
    horasEl.textContent = horas;
    minutosEl.textContent = minutos;
    segundosEl.textContent = segundos;

    mensajeEl.textContent =
      dias === 1 ? "✨ Falta solo 1 día ✨" : "";
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);

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
      const endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) {
        index = (index + 1) % dots.length;
      } else if (endX - startX > 50) {
        index = (index - 1 + dots.length) % dots.length;
      }
      mostrarSlide(index);
    });
  }

  /* ================== MÚSICA ================== */
  const audio = document.getElementById("musica");
  const icon = document.getElementById("music-icon");
  const btn = document.querySelector(".music-player");

  let reproduciendo = false;
  if (audio) audio.volume = 0;

  function fadeIn() {
    let v = 0;
    const fade = setInterval(() => {
      if (v < 1) {
        v += 0.05;
        audio.volume = v;
      } else clearInterval(fade);
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
      });
    } else {
      fadeOut();
      icon.textContent = "▶";
      btn.classList.remove("playing");
      reproduciendo = false;
    }
  };

  /* ================== REVEAL ================== */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 120) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  /* ================== RSVP ================== */
  const form = document.getElementById("rsvp-form");
  const respuesta = document.getElementById("respuesta");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);

      fetch("PEGAR_ACÁ_TU_URL_DE_GOOGLE_APPS_SCRIPT", {
        method: "POST",
        body: data
      })
      .then(() => {
        respuesta.textContent = "✨ Gracias por confirmar ✨";
        form.reset();
      })
      .catch(() => {
        respuesta.textContent = "❌ Error al enviar. Intentá nuevamente.";
      });
    });
  }

});
