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
      if (contadorEl) contadorEl.style.display = "none";
      if (mensajeEl) mensajeEl.textContent = "🎉 ¡Ya estamos festejando! 🎉";
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((distancia / (1000 * 60)) % 60);
    const segundos = Math.floor((distancia / 1000) % 60);

    diasEl.textContent = dias;
    horasEl.textContent = horas.toString().padStart(2, "0");
    minutosEl.textContent = minutos.toString().padStart(2, "0");
    segundosEl.textContent = segundos.toString().padStart(2, "0");

    if (mensajeEl) {
      mensajeEl.textContent = dias === 1 ? "✨ Falta solo 1 día ✨" : "";
    }
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
      if (startX - endX > 50) index = (index + 1) % dots.length;
      else if (endX - startX > 50) index = (index - 1 + dots.length) % dots.length;
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
        if (icon) icon.textContent = "❚❚";
        if (btn) btn.classList.add("playing");
        reproduciendo = true;
      }).catch(() => {});
    } else {
      fadeOut();
      if (icon) icon.textContent = "▶";
      if (btn) btn.classList.remove("playing");
      reproduciendo = false;
    }
  };

  /* ================== AUTOPLAY MOBILE ================== */
  document.addEventListener("click", () => {
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
  }, { once: true });

  /* ================== REVEAL ================== */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < windowHeight - 120) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  /* ================== WHATSAPP CONFIRMACIÓN ================== */
  const btnWhatsapp = document.getElementById("btnWhatsapp");
  if (btnWhatsapp) {
    const telefono = "5493496538566"; // 🔴 CAMBIAR
    const mensaje = encodeURIComponent(
      "Hola! Confirmo mi asistencia a los 15 🎉✨\n\nNombre:\nCantidad de personas:\nYa realicé el pago."
    );
    btnWhatsapp.href = `https://wa.me/${telefono}?text=${mensaje}`;
  }

  /* ================== CONFIRMADO VISUAL ================== */
  const formBox = document.querySelector(".formulario-box");
  const confirmado = document.getElementById("confirmado");

  if (formBox && confirmado) {
    formBox.addEventListener("click", () => {
      confirmado.classList.remove("oculto");
    });
  }

});
// Mostrar / ocultar invitados según asistencia
const selectAsistencia = document.querySelector(
  '#form-confirmacion select[name="asistencia"]'
);
const grupoInvitados = document.querySelector('.grupo-importes');

if (selectAsistencia && grupoInvitados) {
  selectAsistencia.addEventListener('change', () => {
    if (selectAsistencia.value === 'SI') {
      grupoInvitados.classList.add('activo');
    } else {
      grupoInvitados.classList.remove('activo');
    }
  });
}
