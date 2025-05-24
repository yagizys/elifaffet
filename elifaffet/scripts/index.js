const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const container = document.getElementById('mainContainer');

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Hayır butonuna tıklanırsa kaçar
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); 
    moveButton();
});

if (!isMobile) {
    noBtn.addEventListener('mouseover', function() {
        moveButton();
    });
}

noBtn.addEventListener('click', function(e) {
    if (isMobile) {
        e.preventDefault();
        moveButton();
    }
});

// Butonu ekranın farklı bir yerine taşır
function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    randomX = Math.max(10, Math.min(randomX, maxX - 10));
    randomY = Math.max(10, Math.min(randomY, maxY - 10));

    noBtn.style.position = 'fixed';
    noBtn.style.top = randomY + 'px';
    noBtn.style.left = randomX + 'px';
    noBtn.style.transition = 'all 0.2s ease-out';
}

// Evet'e basılınca olanlar
function accept() {
    container.style.display = 'none';
    successMessage.style.display = 'flex';

    createConfetti();
    
    // Anlamazdın şarkısını çal
    const audio = document.getElementById("yesMusic");
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.warn("Ses çalınamadı:", err);
    });
}

// Konfeti efekti
function createConfetti() {
    const colors = [
        '#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#7f8c8d', '#16a085'
    ];

    const confettiCount = 200;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;

            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}vw`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 10);
    }
}

// Hayır'a basıldığında uyarı göster
function showToast() {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "got evete bas lan değerlerini skmiim cirkinmalkopek BAS EVET'e",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}
