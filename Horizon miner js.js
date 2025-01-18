document.addEventListener("DOMContentLoaded", () => {
    let balance = 0.0000000000;
    let miningSpeed = 0.0000000010; // Velocidade inicial de mineração
    let miningInterval;
    let countdownTime = 12 * 60 * 60; // 12 horas em segundos
    let countdownInterval;

    // Exibe o saldo inicial
    const balanceElement = document.getElementById('balance');
    const timerElement = document.getElementById('timer');
    const speedElement = document.getElementById('speed');

    if (!balanceElement || !timerElement || !speedElement) {
        console.error('Elementos HTML com os IDs balance, timer ou speed não foram encontrados.');
        return;
    }

    balanceElement.innerText = balance.toFixed(10);

    // Função para iniciar a mineração
    function startMining() {
        // Inicia o cronômetro de contagem regressiva
        if (!countdownInterval) {
            countdownInterval = setInterval(updateCountdown, 1000);
        }

        // Inicia o processo de mineração
        if (!miningInterval) {
            miningInterval = setInterval(() => {
                balance += miningSpeed;
                balanceElement.innerText = balance.toFixed(10);
            }, 1000); // Incrementa o saldo a cada segundo
        }
    }

    // Função para atualizar o cronômetro
    function updateCountdown() {
        if (countdownTime > 0) {
            countdownTime--;
            const hours = Math.floor(countdownTime / 3600);
            const minutes = Math.floor((countdownTime % 3600) / 60);
            const seconds = countdownTime % 60;
            timerElement.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            clearInterval(countdownInterval);
            clearInterval(miningInterval);
            alert('Tempo de mineração encerrado!');
        }
    }

    // Função para acelerar a mineração
    function accelerateMining() {
        miningSpeed += 0.0000000010; // Aumenta a velocidade
        speedElement.innerText = `${(miningSpeed * 1e9).toFixed(1)} GH/s`;
    }

    // Event listeners para os botões
    document.getElementById('startButton').addEventListener('click', startMining);
    document.getElementById('accelerateButton').addEventListener('click', accelerateMining);
});

