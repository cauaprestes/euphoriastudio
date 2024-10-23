document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu'); // Seleciona o botão do menu hamburguer
    const navLinksContainer = document.querySelector('.nav-links'); // Seleciona o container dos links
    const links = document.querySelectorAll('.nav-links a'); // Seleciona todos os links do menu

    // Alternar visibilidade do menu hamburguer ao clicar
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active'); // Adiciona ou remove a classe 'active'
    });

    // Navegação suave para os links e fechar o menu no mobile após o clique
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão de navegação
            const targetId = link.getAttribute('href'); // Pega o ID do link clicado
            const targetSection = document.querySelector(targetId); // Seleciona a seção alvo
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Faz a rolagem suave até a seção

            // Fecha o menu se a largura da janela for menor ou igual a 768px (mobile)
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
});
