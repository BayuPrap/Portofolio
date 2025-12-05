// Contoh: Animasi saat scroll
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate__animated", "animate__fadeInUp");
            }
        });
    });

    document.querySelectorAll(".card").forEach(card => {
        card.classList.add("opacity-0");
        observer.observe(card);
    });
});