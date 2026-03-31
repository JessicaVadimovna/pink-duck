document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("stars-container");

    const BIG_STARS_COUNT = 15;
    const TINY_STARS_COUNT = 60;
    
    // Проверка на мобильный экран
    const isMobile = window.innerWidth <= 768;

    // Вспомогательная функция для случайных значений
    const random = (min, max) => Math.random() * (max - min) + min;

    // Генерация больших 5-конечных звезд
    for (let i = 0; i < BIG_STARS_COUNT; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "star-wrapper parallax";

        // Масштабируем размер звезд для маленьких экранов
        const size = isMobile ? random(8, 16) : random(15, 30);
        const x = random(0, 100);
        const y = random(0, 100);
        
        // Чем больше звезда, тем она "ближе" и быстрее двигается при параллаксе
        const depthSpeed = size * 0.001; 
        
        // Отдельно добавляем мигание с задержкой
        const delay = random(0, 4);
        const duration = random(1.5, 3);
        
        wrapper.style.width = `${size}px`;
        wrapper.style.height = `${size}px`;
        wrapper.style.left = `${x}vw`;
        wrapper.style.top = `${y}vh`;
        wrapper.style.animationDuration = `${duration}s`;
        wrapper.style.animationDelay = `${delay}s`;
        wrapper.dataset.speed = depthSpeed.toString();

        const shape = document.createElement("div");
        shape.className = "star-shape";
        
        wrapper.appendChild(shape);
        container.appendChild(wrapper);
    }

    // Генерация мелких круглых звезд / пылинок
    for (let i = 0; i < TINY_STARS_COUNT; i++) {
        const dust = document.createElement("div");
        dust.className = "tiny-star parallax";

        // Пылинки тоже делаем чуть мельче на телефонах
        const size = isMobile ? random(1, 2) : random(1, 4);
        const x = random(0, 100);
        const y = random(0, 100);
        const depthSpeed = size * 0.005; 
        
        const delay = random(0, 5);

        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${x}vw`;
        dust.style.top = `${y}vh`;
        dust.style.animationDuration = `2s`;
        dust.style.animationDelay = `${delay}s`;
        dust.dataset.speed = depthSpeed.toString();

        container.appendChild(dust);
    }

    // Параллакс Эффект
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Текущие и целевые координаты для плавности (lerp)
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    
    // Центр экрана для смещения (в пикселях)
    const windowCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    document.addEventListener("mousemove", (e) => {
        // Разница между позицией курсора и центром экрана
        targetX = e.clientX - windowCenter.x;
        targetY = e.clientY - windowCenter.y;
    });

    // Реакция на изменение размера окна
    window.addEventListener("resize", () => {
        windowCenter.x = window.innerWidth / 2;
        windowCenter.y = window.innerHeight / 2;
    });

    function animateParallax() {
        // Плавное приближение текущего значения к целевому
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed);
            
            // Звезды "двигаются" в противоположную сторону (speed < 0 можно сделать, но пусть будет классический)
            const offsetX = currentX * speed * -1;
            const offsetY = currentY * speed * -1;
            
            el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        requestAnimationFrame(animateParallax);
    }

    // Запуск цикла анимации
    animateParallax();
});
