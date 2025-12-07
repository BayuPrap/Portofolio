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

    // Typewriter Effect for Hero Title
    document.addEventListener("DOMContentLoaded", function () {
        const text = "Hi, Saya Data Analyst";
        const element = document.querySelector(".animate-text");
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100); // Kecepatan mengetik
            }
        }

        // Hapus teks awal dulu, lalu mulai typewriter
        element.textContent = "";
        setTimeout(typeWriter, 1000); // Mulai setelah 1 detik
    });

    // === Navbar Hide/Show on Scroll ===
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll ke bawah → sembunyikan navbar
            navbar.classList.add('hidden');
        } else {
            // Scroll ke atas → tampilkan navbar
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });

    // === Smooth Scroll for Navigation Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });