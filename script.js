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



// 🔒 Enviar por celular

  document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form-confirmacion");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ⛔ no envía formulario clásico

    const nombre = form.querySelector('input[name="nombre"]')?.value || "";
    const asistencia = form.querySelector('select[name="asistencia"]')?.value;

    let mensaje = `✨ *Confirmación de asistencia* ✨%0A%0A`;
    mensaje += `👤 *Nombre:* ${nombre}%0A`;
    mensaje += `📩 *Asistencia:* ${asistencia}%0A%0A`;

    if (asistencia === "SI") {
      const mayores = form.querySelector('input[name="mayores"]').value;
      const m25 = form.querySelector('input[name="menores_2_5"]').value;
      const m612 = form.querySelector('input[name="menores_6_12"]').value;
      const adolescentes = form.querySelector('input[name="adolescentes"]').value;
      const trasnoche = form.querySelector('input[name="trasnoche"]').value;

      mensaje += `👥 *Invitados*%0A`;
      mensaje += `- Mayores: ${mayores}%0A`;
      mensaje += `- Menores 2 a 5: ${m25}%0A`;
      mensaje += `- Menores 6 a 12: ${m612}%0A`;
      mensaje += `- Adolescentes: ${adolescentes}%0A`;
      mensaje += `- Trasnoche: ${trasnoche}%0A%0A`;

      const menus = [...form.querySelectorAll('input[name="menu[]"]:checked')]
        .map(el => el.value);

      if (menus.length > 0) {
        mensaje += `🍽️ *Menú:* ${menus.join(", ")}%0A%0A`;
      }
    }

    mensaje += `💛 Gracias por avisar`;

    // 📱 NÚMERO DE WHATSAPP (cambiá este)
    const telefono = "5493496538566"; // ej: 5493496123456

    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
  });

});

});
