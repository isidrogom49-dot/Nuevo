// ==================== ELEMENTOS ====================
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const menuBtn = document.querySelector('.menu-btn');
const bannerImg = document.getElementById("bannerImg");

// ==================== SALUDO DINÁMICO ====================
const greetingSpan = document.createElement("span");
greetingSpan.style.marginRight = "15px";
greetingSpan.style.fontWeight = "bold";
greetingSpan.style.fontSize = "16px";
greetingSpan.style.color = "#00c2ff";
greetingSpan.style.opacity = "0";  
greetingSpan.style.transform = "translateY(30px)";  
greetingSpan.style.transition = "opacity 0.8s ease, transform 0.8s ease, text-shadow 1.2s ease-in-out";

// Determinar hora actual
const hour = new Date().getHours();
if (hour >= 5 && hour < 12) {
    greetingSpan.textContent = "¡Buenos días!";
} else if (hour >= 12 && hour < 19) {
    greetingSpan.textContent = "¡Buenas tardes!";
} else {
    greetingSpan.textContent = "¡Buenas noches!";
}

// Insertar saludo antes del botón
openBtn.parentNode.insertBefore(greetingSpan, openBtn);

// ==================== EFECTO CINEMATOGRÁFICO ====================
window.addEventListener("load", () => {
    // ------------------- LOADER -------------------
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);
    }, 2500);

    // Animación saludo + botón
    setTimeout(() => {
        greetingSpan.style.opacity = "1";
        greetingSpan.style.transform = "translateY(0px)";
        openBtn.style.opacity = "1";
        openBtn.style.transform = "translateY(0px)";
    }, 1000);

    // Resplandor pulsante del saludo
    setInterval(() => {
        greetingSpan.style.textShadow = greetingSpan.style.textShadow.includes("20px")
            ? "0 0 5px #00c2ff, 0 0 15px #0077ff"
            : "0 0 10px #00c2ff, 0 0 20px #0077ff";
    }, 1200);

    // Animación miembros del equipo
    const members = document.querySelectorAll('.team .member');
    members.forEach((member, i) => {
        member.style.opacity = "0";
        member.style.transform = "translateY(30px)";
        setTimeout(() => {
            member.style.opacity = "1";
            member.style.transform = "translateY(0px)";
        }, 1600 + i * 200);
    });
});

// ==================== MODAL ====================
function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
menuBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// ==================== EFECTO 3D EN BANNER ====================
bannerImg.addEventListener("mousemove", (e) => {
    const rect = bannerImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    bannerImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});
bannerImg.addEventListener("mouseleave", () => {
    bannerImg.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});