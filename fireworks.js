const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height / 2; // Las estrellas se distribuyen en la parte superior
        this.size = Math.random() * 1.5 + 0.5; // Tamaño aleatorio para cada estrella
        this.alpha = Math.random() * 0.3 + 0.7; // Estrellas semi-transparentes
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white'; // Color blanco para las estrellas
        ctx.fill();
    }

    twinkle() {
        // Estrellas titilan cambiando su opacidad
        this.alpha = Math.random() * 0.3 + 0.7;
    }
}

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * -6 - 3;
        this.alpha = 1;
        this.fadeSpeed = 0.01;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.fadeSpeed;
    }
}

let fireworks = [];
let stars = [];

// Crear las estrellas
function createStars() {
    for (let i = 0; i < 600; i++) { // Añadir más estrellas si es necesario
        stars.push(new Star());
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    for (let i = 0; i < 50; i++) {
        fireworks.push(new Firework(x, y));
        
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo azul oscuro (noche)
    ctx.fillStyle = '#001f3d'; // Un azul profundo para el cielo nocturno
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar las estrellas
    stars.forEach(star => {
        star.twinkle();
        star.draw();
    });

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Crear múltiples fuegos artificiales a la vez
function burstFireworks() {
    createFirework(); 
    setTimeout(createFirework, 300);
    setTimeout(createFirework, 600);
}

setInterval(burstFireworks, 1000); // Crear fuegos artificiales cada segundo

// Inicializar las estrellas
createStars();
animate();