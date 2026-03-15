let poppedCount = 0;
const totalBalloons = 3;
let confettiInterval;

function popBalloon(element) {
    if (element.classList.contains('popped')) return;
    
    element.classList.add('popped');
    poppedCount++;
    
    if (poppedCount === totalBalloons) {
        setTimeout(revealSurprise, 500);
    }
}

function revealSurprise() {
    document.getElementById('balloons-container').classList.add('hidden');
    
    const surpriseSection = document.getElementById('surprise-section');
    surpriseSection.classList.remove('hidden');
    
    setTimeout(() => {
        surpriseSection.classList.add('visible');
    }, 10);
    
    // Initial burst
    createConfetti(100);
    
    // Continuous trickle
    confettiInterval = setInterval(() => {
        createConfetti(3);
    }, 500);

    const audio = document.getElementById('birthday-audio');
    audio.play().catch(error => {
        console.log("Audio playback failed.", error);
    });
}

function createConfetti(count) {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff4081', '#00bcd4', '#ffeb3b', '#4caf50', '#ff9800', '#9c27b0'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100 + 'vw';
        const size = (Math.random() * 10 + 5) + 'px';
        const duration = (Math.random() * 3 + 2) + 's';
        const delay = (count > 5) ? (Math.random() * 2) + 's' : '0s';
        
        confetti.style.backgroundColor = color;
        confetti.style.left = left;
        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.animation = `confetti-fall ${duration} linear ${delay} forwards`;
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

function toggleMusic() {
    const audio = document.getElementById('birthday-audio');
    const btn = document.getElementById('music-toggle');
    
    if (audio.paused) {
        audio.play();
        btn.innerText = '🔊';
    } else {
        audio.pause();
        btn.innerText = '🔇';
    }
}

const giftMessages = {
    1: "Желаю тебе море счастья и улыбок каждый день! ✨",
    2: "Пусть все твои самые смелые мечты сбываются! 🚀",
    3: "Здоровья, удачи и верных друзей рядом! 💖"
};

function openGift(id) {
    const modal = document.getElementById('gift-modal');
    const message = document.getElementById('gift-message');
    
    message.innerText = giftMessages[id];
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('gift-modal').classList.add('hidden');
}

window.onclick = function(event) {
    const modal = document.getElementById('gift-modal');
    if (event.target == modal) {
        closeModal();
    }
}
