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
      if (mensajeEl) mensajeEl.textContent = "🎉 ¡Ya estamos festejando! 🎉";
      return;
    }

    diasEl.textContent = Math.floor(distancia / (1000 * 60 * 60 * 24));
    horasEl.textContent = Math.floor((distancia / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
    minutosEl.textContent = Math.floor((distancia / (1000 * 60)) % 60).toString().padStart(2, "0");
    segundosEl.textContent = Math.floor((distancia / 1000) % 60).toString().padStart(2, "0");
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);

  /* =====================================================
     MÚSICA
  ===================================================== */
  const audio = document.getElementById("musica");
  let reproduciendo = false;
  if (audio) audio.volume = 0;

  window.toggleMusic = function () {
    if (!audio) return;

    if (!reproduciendo) {
      audio.play().then(() => {
        audio.volume = 1;
        reproduciendo = true;
      }).catch(() => {});
    } else {
      audio.pause();
      reproduciendo = false;
    }
  };

  /* =====================================================
     MOSTRAR / OCULTAR INVITADOS
  ===================================================== */
  const selectAsistencia = document.querySelector('#form-confirmacion select[name="asistencia"]');
  const grupoInvitados = document.querySelector('.grupo-importes');

  if (selectAsistencia && grupoInvitados) {
    grupoInvitados.classList.remove("activo");

    selectAsistencia.addEventListener("change", () => {
      grupoInvitados.classList.toggle("activo", selectAsistencia.value === "SI");
    });
  }

  /* =====================================================
     ENVÍO WHATSAPP
  ===================================================== */
  const form = document.getElementById("form-confirmacion");
  const mensajeUI = document.getElementById("mensaje-confirmado");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.querySelector('input[name="nombre"]')?.value.trim();
    const asistencia = form.querySelector('select[name="asistencia"]')?.value;

    if (!nombre || !asistencia) {
      mostrarMensaje("⚠️ Completá nombre y asistencia", false);
      return;
    }

    let mensaje = `✨ *Confirmación de asistencia* ✨\n\n`;
    mensaje += `👤 Nombre: ${nombre}\n`;
    mensaje += `📩 Asistencia: ${asistencia}\n\n`;

    if (asistencia === "SI") {
      mensaje += `👥 Invitados:\n`;
      mensaje += `- Mayores: ${valorNumero("mayores")}\n`;
      mensaje += `- Menores 2 a 5: ${valorNumero("menores_2_5")}\n`;
      mensaje += `- Menores 6 a 12: ${valorNumero("menores_6_12")}\n`;
      mensaje += `- Adolescentes: ${valorNumero("adolescentes")}\n`;
      mensaje += `- Trasnoche: ${valorNumero("trasnoche")}\n\n`;

      const menus = [...form.querySelectorAll('input[name="menu[]"]:checked')]
        .map(el => el.value);

      if (menus.length) {
        mensaje += `🍽️ Menú: ${menus.join(", ")}\n\n`;
      }

      mensaje += `💳 Alias para transferencia:\nmelu.1985\n\n`;
    }

    mensaje += `💛 Gracias por confirmar`;

    const telefono = "5493496538566"; // ✅ TU NÚMERO
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
    mostrarMensaje("✨ Confirmación enviada ✨", true);
  });

  function valorNumero(name) {
    return form.querySelector(`input[name="${name}"]`)?.value || "0";
  }

  function mostrarMensaje(texto, ok) {
  if (!mensajeUI) return;

  mensajeUI.textContent = texto;
  mensajeUI.classList.remove("activo");

  if (ok) {
    // 🔊 reproducir sonido
    const sonido = document.getElementById("sonido-enviado");
    if (sonido) {
      sonido.currentTime = 0;
      sonido.play().catch(() => {});
    }

    // ✨ animación visual
    setTimeout(() => {
      mensajeUI.classList.add("activo");
    }, 100);
  }
}


});
