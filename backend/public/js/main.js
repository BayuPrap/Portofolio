    // Ambil data dari data.json
    fetch('/data/data.json')
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

            // Render Skills
            const skillsContainer = document.querySelector('#skills-container');

            // Kosongkan dulu
            skillsContainer.innerHTML = '';

            // Buat row
            const row = document.createElement('div');
            row.className = 'row text-center';

            data.skills.forEach(skill => {
                const col = document.createElement('div');
                col.className = 'col-md-3 mb-4';
                
            col.innerHTML = `
                <i class="${skill.icon === 'python' ? 'fab fa-python' : 'fas fa-' + skill.icon} fa-2x text-purple mb-3"></i>
                <h5 class="text-light">${skill.name}</h5>
                <p class="text-deskripsi">${skill.description}</p>
            `;
                
                row.appendChild(col);
            });

            skillsContainer.appendChild(row);  

            // Render Projects
            const projectsContainer = document.querySelector('#projects-container');

            // Kosongkan dulu container
            projectsContainer.innerHTML = '';

            // Buat row baru
            const projectRow = document.createElement('div');
            projectRow.className = 'row';

            data.projects.forEach(project => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                
                col.innerHTML = `
                    <div class="card-project">
                        <div class="project-badge">${project.tags[0]}</div>
                        <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <a href="${project.file}" target="_blank" class="btn btn-outline-purple btn-sm">Lihat</a>
                        </div>
                    </div>
                `;
                
                projectRow.appendChild(col); // <-- Ganti dari 'row' ke 'projectRow'
            });

                projectsContainer.appendChild(projectRow);

        projectsContainer.appendChild(projectRow);
        })
        .catch(err => console.error("Gagal memuat data:", err));

        

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

    // === Fade-In & Fade-Out Animation on Scroll ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                entry.target.classList.remove('disappear'); // Hapus class disappear
            } else {
                entry.target.classList.remove('appear');
                entry.target.classList.add('disappear'); // Tambahkan class disappear
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });