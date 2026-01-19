document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     CONTADOR REGRESIVO
  ===================================================== */
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
      if (mensajeEl) {
        mensajeEl.textContent = "🎉 ¡Ya estamos festejando! 🎉";
      }
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

  /* =====================================================
     MÚSICA DE FONDO (fade in / fade out)
  ===================================================== */
  const audio = document.getElementById("musica");
  const btnMusic = document.querySelector(".music-player");
  let reproduciendo = false;

  if (audio) audio.volume = 0;

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
      audio.play()
        .then(() => {
          fadeIn();
          reproduciendo = true;
        })
        .catch(() => {});
    } else {
      fadeOut();
      reproduciendo = false;
    }
  };

  /* Permitir audio en mobile (1er toque) */
  document.addEventListener("click", () => {
    if (audio && audio.paused && !reproduciendo) {
      audio.play().catch(() => {});
    }
  }, { once: true });

  /* =====================================================
     CONFIRMACIÓN DE ASISTENCIA
     - Solo muestra invitados + menú si elige "SI"
  ===================================================== */
  const selectAsistencia = document.querySelector(
    '#form-confirmacion select[name="asistencia"]'
  );
  const grupoInvitados = document.querySelector('.grupo-importes');

  if (selectAsistencia && grupoInvitados) {

    // 🔒 Estado inicial SIEMPRE oculto
    grupoInvitados.classList.remove("activo");

    selectAsistencia.addEventListener("change", () => {
      if (selectAsistencia.value === "SI") {
        grupoInvitados.classList.add("activo");
      } else {
        grupoInvitados.classList.remove("activo");
      }
    });
  }



});
