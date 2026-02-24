// CONFIGURACIÓN RÁPIDA (vigencia 1–30 de marzo)
const CONFIG = {
  redesUrl: "https://instagram.com/DIRECOMHN",
  // CAMBIAR por el número real de WhatsApp DIRECOM (formato 504xxxxxxxx)
  whatsappDestino: "50400000000",
  // Sorteo EN VIVO: 30 de marzo, 6:00 pm (Honduras -06:00)
  sorteoFechaISO: "2026-03-30T18:00:00-06:00",
  campaña: "Rifa Carreta Tornado + Desbrozadora Bellota"
};

const pad = (n) => String(n).padStart(2, "0");

function startCountdown(){
  const end = new Date(CONFIG.sorteoFechaISO).getTime();
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, end - now);

    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    diff -= mins * (1000*60);
    const secs = Math.floor(diff / 1000);

    document.getElementById("cdDays").textContent = pad(days);
    document.getElementById("cdHours").textContent = pad(hours);
    document.getElementById("cdMins").textContent = pad(mins);
    document.getElementById("cdSecs").textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
}

function setupForm(){
  const form = document.getElementById("rifaForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const msg =
`Hola DIRECOM, quiero participar en la *${CONFIG.campaña}*.
✅ Compré *2 carretas Tornado* (vigencia 1–30 de marzo).

Nombre: ${data.get("nombre")}
DNI/RTN: ${data.get("id")}
Tel: ${data.get("tel")}
Ciudad: ${data.get("ciudad")}
Punto de compra: ${data.get("punto")}
Factura: ${data.get("factura")}
Fecha: ${data.get("fecha")}

Adjunto foto de la factura en este chat. Gracias.`;

    const url = `https://wa.me/${CONFIG.whatsappDestino}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });
}

function init(){
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("btnRedes").href = CONFIG.redesUrl;
  startCountdown();
  setupForm();
}
document.addEventListener("DOMContentLoaded", init);
