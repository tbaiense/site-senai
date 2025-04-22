document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("#header-hamb-menu");

    const nav = document.querySelector("#header-nav");
    btn.addEventListener('click', () => {
        nav.classList.toggle('visible');
    });
});