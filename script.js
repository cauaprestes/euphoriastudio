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
// --- LÓGICA DO CARROSSEL DE IMAGENS ---
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Organiza os slides um ao lado do outro
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        }
        
        // Seta o primeiro slide como o atual
        track.querySelector('.carousel-slide').classList.add('current-slide');

        // Quando clicar no botão da direita, move para o próximo slide
        nextButton.addEventListener('click', e => {
            e.stopPropagation(); // Impede que o modal abra ao clicar no botão
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            if (nextSlide) {
                moveToSlide(track, currentSlide, nextSlide);
            }
        });

        // Quando clicar no botão da esquerda, move para o slide anterior
        prevButton.addEventListener('click', e => {
            e.stopPropagation(); // Impede que o modal abra ao clicar no botão
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            if (prevSlide) {
                moveToSlide(track, currentSlide, prevSlide);
            }
        });
    });
