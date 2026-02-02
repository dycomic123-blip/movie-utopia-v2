document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Text Split
    document.querySelectorAll('.animate-text-reveal').forEach(el => {
        const text = el.innerText; el.innerHTML = '';
        text.split(' ').forEach((word, wi) => {
            const ws = document.createElement('span'); ws.style.display = 'inline-block'; ws.style.whiteSpace = 'nowrap'; ws.style.marginRight = '0.25em';
            [...word].forEach((char, ci) => {
                const s = document.createElement('span'); s.textContent = char; s.className = 'char-slide-down';
                s.style.animationDelay = `${(wi * 100) + (ci * 50)}ms`;
                ws.appendChild(s);
            });
            el.appendChild(ws);
        });
    });
});
