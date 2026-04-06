// ==================== ELEMENTS ====================
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const bannerImg = document.getElementById("bannerImg");
const menuBtnModal = document.querySelector('.team-menu-btn .menu-btn');

// ==================== DYNAMIC GREETING ====================
const greetingSpan = document.createElement("span");
greetingSpan.style.marginRight = "15px";
greetingSpan.style.fontWeight = "bold";
greetingSpan.style.fontSize = "16px";
greetingSpan.style.color = "#00c2ff";
greetingSpan.style.opacity = "0";  
greetingSpan.style.transform = "translateY(30px)";  
greetingSpan.style.transition = "opacity 0.8s ease, transform 0.8s ease, text-shadow 1.2s ease-in-out";
greetingSpan.setAttribute("aria-live", "polite");

const hour = new Date().getHours();
if(hour>=5 && hour<12) greetingSpan.textContent = "Good morning!";
else if(hour>=12 && hour<19) greetingSpan.textContent = "Good afternoon!";
else greetingSpan.textContent = "Good evening!";

openBtn.parentNode.insertBefore(greetingSpan, openBtn);

// ==================== LOADER AND ANIMATIONS ====================
window.addEventListener("load", ()=>{
    setTimeout(()=>{
        document.getElementById("loader").style.opacity="0";
        setTimeout(()=>document.getElementById("loader").style.display="none",500);
    },2500);

    setTimeout(()=>{
        greetingSpan.style.opacity="1";
        greetingSpan.style.transform="translateY(0px)";
        openBtn.style.opacity="1";
        openBtn.style.transform="translateY(0px)";
    },1000);

    setInterval(()=>{
        greetingSpan.style.textShadow = greetingSpan.style.textShadow.includes("20px")
            ? "0 0 5px #00c2ff, 0 0 15px #0077ff"
            : "0 0 10px #00c2ff, 0 0 20px #0077ff";
    },1200);

    // Animate members
    const members = document.querySelectorAll('.team .member');
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.opacity="1";
                entry.target.style.transform="translateY(0px)";
                observer.unobserve(entry.target);
            }
        });
    },{threshold:0.5});
    members.forEach(member=>observer.observe(member));

    // Animate menu button
    setTimeout(()=>{
        menuBtnModal.style.opacity="1";
        menuBtnModal.style.transform="translateY(0px)";
    }, 2000);
});

// ==================== MODAL ====================
let lastFocused;
function openModal(){
    lastFocused = document.activeElement;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    closeBtn.focus();
}
function closeModal(){
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow="auto";
    lastFocused?.focus();
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click",(e)=>{if(e.target===modal) closeModal();});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape") closeModal();});

// ==================== 3D EFFECT ON BANNER ====================
let requestId;
bannerImg.addEventListener("mousemove",(e)=>{
    const rect = bannerImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y-centerY)/centerY)*8;
    const rotateY = ((x-centerX)/centerX)*8;
    cancelAnimationFrame(requestId);
    requestId = requestAnimationFrame(()=>{
        bannerImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
});
bannerImg.addEventListener("mouseleave",()=>{cancelAnimationFrame(requestId); bannerImg.style.transform="rotateX(0deg) rotateY(0deg) scale(1)";});
