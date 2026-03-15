let poppedCount = 0;
const totalBalloons = 3;

function popBalloon(element) {
    if (element.classList.contains('popped')) return;
    
    element.classList.add('popped');
    poppedCount++;
    
    if (poppedCount === totalBalloons) {
        setTimeout(revealSurprise, 500);
    }
}

function revealSurprise() {
    // Hide balloons container (this also hides hint-text)
    document.getElementById('balloons-container').classList.add('hidden');
    
    // Show surprise section
    const surpriseSection = document.getElementById('surprise-section');
    surpriseSection.classList.remove('hidden');
    
    // Trigger fade-in
    setTimeout(() => {
        surpriseSection.classList.add('visible');
    }, 10);
    
    // Trigger confetti
    createConfetti();

    // Play audio
    const audio = document.getElementById('birthday-audio');
    audio.play().catch(error => {
        console.log("Audio playback failed. Interaction might be required first or file is missing.", error);
    });
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff4081', '#00bcd4', '#ffeb3b', '#4caf50', '#ff9800', '#9c27b0'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100 + 'vw';
        const size = (Math.random() * 10 + 5) + 'px';
        const duration = (Math.random() * 3 + 2) + 's';
        const delay = (Math.random() * 2) + 's';
        
        confetti.style.backgroundColor = color;
        confetti.style.left = left;
        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.animation = `confetti-fall ${duration} linear ${delay} forwards`;
        
        container.appendChild(confetti);
        
        // Cleanup
        setTimeout(() => confetti.remove(), 5000);
    }
}

const giftMessages = {
    1: "Щастя",
    2: "Здоровля",
    3: "Ну и просто всего самого лучшего :D"
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

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gift-modal');
    if (event.target == modal) {
        closeModal();
    }
}
