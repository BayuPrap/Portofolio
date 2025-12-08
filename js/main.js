    // Ambil data dari data.json
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        // Render About Section
        document.querySelector('#about-bio').textContent = data.about.bio;

        // Render Stats
        const statsContainer = document.querySelector('#stats-container');
        data.about.stats.forEach(stat => {
            statsContainer.innerHTML += `
                <span class="stat-item">
                    <i class="fas fa-${stat.icon} me-2"></i>${stat.label}
                </span>
            `;
        });

        // Render Projects
        const projectsContainer = document.querySelector('#projects-container');
        data.projects.forEach(project => {
            projectsContainer.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card-project">
                        <div class="project-badge">${project.tags[0]}</div>
                        <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <a href="${project.file}" target="_blank" class="btn btn-outline-purple btn-sm">Lihat</a>
                        </div>
                    </div>
                </div>
            `;
        });
    });
    
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