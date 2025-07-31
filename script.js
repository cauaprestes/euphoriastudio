document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (para navegação na mesma página)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Suaviza a rolagem
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Desconta a altura do header
                    behavior: 'smooth'
                });
            }

            // Fecha o menu hamburguer se estiver aberto
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });


    // --- LÓGICA DO MODAL (POP-UP) ---
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeButton = document.querySelector('.close-button');
    const clickableItems = document.querySelectorAll('.clickable');

    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');
            const price = item.getAttribute('data-price');

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = price;

            modal.style.display = 'flex';
        });
    });

    // Função para fechar o modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeButton.addEventListener('click', closeModal);

    // Fecha o modal se clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });


    // --- LÓGICA DA ANIMAÇÃO DE SCROLL (FADE-IN) ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
