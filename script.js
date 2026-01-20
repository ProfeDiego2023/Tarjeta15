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
const checkOtro = document.getElementById("menu-otro-check");
const inputOtro = document.getElementById("menu-otro-texto");
const wrapperOtro = document.querySelector(".menu-otro-wrapper");
const form = document.getElementById("form-confirmacion");

if (checkOtro && wrapperOtro && inputOtro) {
  checkOtro.addEventListener("change", () => {
    wrapperOtro.classList.toggle("activo", checkOtro.checked);
    if (!checkOtro.checked) {
      inputOtro.value = "";
    }
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.querySelector('input[name="nombre"]').value.trim();
    const asistencia = form.querySelector('select[name="asistencia"]').value;

    if (!nombre || !asistencia) {
      alert("Completá nombre y asistencia");
      return;
    }

    /* VALIDACIÓN OBLIGATORIA DEL OTRO */
    if (checkOtro.checked && inputOtro.value.trim() === "") {
      inputOtro.focus();
      inputOtro.style.boxShadow = "0 0 0 2px #d4af37";
      return;
    }

    let mensaje = `✨ *Confirmación de asistencia* ✨\n\n`;
    mensaje += `👤 Nombre: ${nombre}\n`;
    mensaje += `📩 Asistencia: ${asistencia}\n\n`;

    if (asistencia === "SI") {
      mensaje += `🍽️ *Menú*\n`;

      const menus = [...form.querySelectorAll('input[name="menu[]"]:checked')]
        .map(el => {
          if (el.value === "Otro") {
            return `Otro: ${inputOtro.value.trim()}`;
          }
          return el.value;
        });

      mensaje += menus.join(", ") + "\n\n";
      mensaje += `💳 Alias: melu.1985\n\n`;
    }

    mensaje += `💛 Gracias por confirmar`;

    const telefono = "5493496538566"; // tu número
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  });
}



 /* =====================================================
     explosion estrellas  completo
  ===================================================== */
 const capa = document.getElementById("efectos-globales");
  if (!capa) return;

  function crearExplosion() {
    const explosion = document.createElement("div");
    explosion.className = "explosion-estrellas";

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;

    const cantidad = 30;
    for (let i = 0; i < cantidad; i++) {
      explosion.appendChild(document.createElement("span"));
    }

    capa.appendChild(explosion);

    setTimeout(() => explosion.remove(), 4500);
  }

  setInterval(crearExplosion, 1800);


});
