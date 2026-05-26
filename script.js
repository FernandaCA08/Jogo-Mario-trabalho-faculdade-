const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const chatMessages = document.querySelector('#chat-messages');
const chatInput = document.querySelector('#chat-input');

let count = 0;

const addChatMessage = (sender, message) => {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const jump = (event) => {
    // Se o usuário estiver digitando no chat, o Mario não pula
    if (document.activeElement === chatInput) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== "") {
        const userText = chatInput.value;
        addChatMessage('Você', userText);
        chatInput.value = '';

        // Pequena interação inovadora do bot
        setTimeout(() => {
            const responses = ["Foco no jogo!", "Cuidado com o cano!", "Bela mensagem!", "Continue pulando!"];
            const random = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage('Bot', random);
        }, 1000);
    }
});

const loop = setInterval(() => {

    console.log('loop');

    count++;
    scoreElement.innerHTML = `SCORE: ${count}`;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = '../img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        scoreElement.innerHTML = `GAME OVER - SCORE: ${count}`;
        scoreElement.style.color = 'red';
        addChatMessage('Bot', 'Ah não! Tente novamente clicando na tela.');

        clearInterval(loop);

        // Recarrega a página ao clicar ou teclar após perder
        setTimeout(() => {
            document.addEventListener('keydown', () => location.reload());
            document.addEventListener('click', () => location.reload());
        }, 1000); // Espera 1 segundo para evitar reinício acidental
    }  
    
}, 10);

document.addEventListener('keydown', jump);