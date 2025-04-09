// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle - simplified and more robust
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            try {
                if (document.body.classList.contains('show-es')) {
                    document.body.classList.remove('show-es');
                    document.body.classList.add('show-en');
                } else {
                    document.body.classList.remove('show-en');
                    document.body.classList.add('show-es');
                }
            } catch (e) {
                // Fallback in case of error
                document.body.className = document.body.classList.contains('show-en') ? 'show-es' : 'show-en';
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Floating code elements - with simplified error handling
    try {
        const floatingElements = document.getElementById('floatingElements');
        if (floatingElements) {
            const codeSnippets = [
                '</>',
                '<h1>Hello World</h1>',
                'function secureCode() { }',
                'const port = 443;',
                'if (isVulnerable) { patch(); }',
                '/* Secure connection established */',
                'ssh -p 2222 user@server',
                'SELECT * FROM users;',
                'npm install security-package',
                'git commit -m "Fix security issue"',
                'sudo nmap -sS target',
                'python3 scanner.py --port=80',
                '{"status": "secured"}',
                'cat /etc/passwd',
                'chmod 600 id_rsa',
                'openssl encrypt data.txt',
                '// TODO: Add authentication',
                'import React from "react";',
                '@media (max-width: 768px) {}',
                'const router = express.Router();',
                'class SecurityScanner extends Scanner'
            ];

            // Create floating elements - reduced number for better performance on mobile
            const isMobile = window.innerWidth < 768;
            const elementsCount = isMobile ? 5 : 10;
            
            for (let i = 0; i < elementsCount; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                element.textContent = randomSnippet;
                element.style.setProperty('--random-x', Math.random());
                element.style.left = `${Math.random() * 90}%`;
                element.style.animationDelay = `${Math.random() * 10}s`;
                floatingElements.appendChild(element);
            }
        }
    } catch (error) {
        // Silent fallback if floating elements fail
    }

    // Add smooth scrolling - simplified and robust
    try {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (!targetId) return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80; // Offset for fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    // Use standard scrolling method with fallback
                    try {
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    } catch (scrollError) {
                        // Fallback for browsers that don't support smooth scrolling
                        window.scrollTo(0, offsetPosition);
                    }
                }
            });
        });
    } catch (error) {
        // Silent fallback if navigation fails
    }

    // Código para el juego de tres en raya
    function setupTicTacToe() {
        const cells = document.querySelectorAll('.cell');
        const gameStatus = document.getElementById('game-status');
        const resetButton = document.getElementById('reset-game');
        const contactInfo = document.getElementById('contact-info');
        
        let currentPlayer = 'x';
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];
        
        // Mensajes de estado del juego
        const statusMessages = {
            es: {
                playerTurn: '¡Tu turno!',
                computerThinking: 'Pensando...',
                playerWin: '¡Has ganado! Acceso concedido.',
                computerWin: 'Has perdido. Inténtalo de nuevo.',
                draw: 'Empate. Inténtalo de nuevo.'
            },
            en: {
                playerTurn: 'Your turn!',
                computerThinking: 'Thinking...',
                playerWin: 'You won! Access granted.',
                computerWin: 'You lost. Try again.',
                draw: 'Draw. Try again.'
            }
        };
        
        // Obtener mensajes según el idioma actual
        function getMessage(key) {
            const lang = document.body.classList.contains('show-es') ? 'es' : 'en';
            return statusMessages[lang][key];
        }
        
        // Funciones para ganar
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
            [0, 4, 8], [2, 4, 6]             // diagonales
        ];
        
        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
            
            if (gameState[clickedCellIndex] !== '' || !gameActive) {
                return;
            }
            
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.classList.add(currentPlayer);
            
            if (checkWin()) {
                gameStatus.textContent = getMessage('playerWin');
                gameActive = false;
                // Mostrar la información de contacto
                setTimeout(() => {
                    contactInfo.style.display = 'block';
                    // Desplazar automáticamente a la información de contacto
                    contactInfo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 1000);
                return;
            }
            
            if (checkDraw()) {
                gameStatus.textContent = getMessage('draw');
                gameActive = false;
                return;
            }
            
            // Turno del ordenador (deliberadamente se deja perder)
            currentPlayer = 'o';
            gameStatus.textContent = getMessage('computerThinking');
            
            setTimeout(() => {
                makeComputerMove();
                // Volver al turno del jugador
                currentPlayer = 'x';
                
                if (gameActive) {
                    gameStatus.textContent = getMessage('playerTurn');
                }
            }, 700);
        }
        
        function makeComputerMove() {
            if (!gameActive) return;
            
            // Estrategia: el ordenador intenta perder
            // Primero busca si puede bloquear una victoria del jugador
            let computerMoveIndex = -1;
            
            // Primero, veamos si hay un movimiento que haría ganar al jugador
            // Primero, veamos si hay un movimiento que haría ganar al jugador
            for (let i = 0; i < gameState.length; i++) {
                if (gameState[i] === '') {
                    // Simular un movimiento del jugador
                    gameState[i] = 'x';
                    
                    // Comprobar si este movimiento haría ganar al jugador
                    const wouldWin = winningConditions.some(condition => {
                        return condition.every(index => gameState[index] === 'x');
                    });
                    
                    // Deshacer el movimiento simulado
                    gameState[i] = '';
                    
                    // Si el jugador podría ganar con este movimiento, no lo bloquees
                    if (wouldWin) {
                        computerMoveIndex = i;
                        break;
                    }
                }
            }
            
            // Si no se encontró un movimiento específico, elige un espacio aleatorio
            if (computerMoveIndex === -1) {
                const emptyIndices = gameState
                    .map((cell, index) => cell === '' ? index : null)
                    .filter(index => index !== null);
                
                if (emptyIndices.length > 0) {
                    // Evitar la posición central si está vacía (para hacer más fácil ganar)
                    if (emptyIndices.includes(4)) {
                        const nonCenterIndices = emptyIndices.filter(index => index !== 4);
                        if (nonCenterIndices.length > 0) {
                            computerMoveIndex = nonCenterIndices[Math.floor(Math.random() * nonCenterIndices.length)];
                        } else {
                            computerMoveIndex = 4;
                        }
                    } else {
                        computerMoveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    }
                }
            }
            
            // Realizar el movimiento del ordenador
            if (computerMoveIndex !== -1) {
                gameState[computerMoveIndex] = 'o';
                cells[computerMoveIndex].classList.add('o');
                
                // Verificar si el ordenador ha ganado (aunque intentamos evitarlo)
                if (checkWin()) {
                    gameStatus.textContent = getMessage('computerWin');
                    gameActive = false;
                    return;
                }
                
                // Verificar empate
                if (checkDraw()) {
                    gameStatus.textContent = getMessage('draw');
                    gameActive = false;
                }
            }
        }
        
        function checkWin() {
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    highlightWinningCells(winningConditions[i]);
                    return true;
                }
            }
            return false;
        }
        
        function highlightWinningCells(combination) {
            combination.forEach(index => {
                cells[index].style.backgroundColor = 'rgba(0, 255, 157, 0.2)';
                cells[index].style.borderColor = 'var(--accent-color)';
            });
        }
        
        function checkDraw() {
            return gameState.every(cell => cell !== '');
        }
        
        function resetGame() {
            currentPlayer = 'x';
            gameActive = true;
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameStatus.textContent = getMessage('playerTurn');
            contactInfo.style.display = 'none';
            
            cells.forEach(cell => {
                cell.classList.remove('x', 'o');
                cell.style.backgroundColor = '';
                cell.style.borderColor = '';
            });
        }
        
        // Event listeners
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
            
            // Mejorar experiencia táctil
            cell.addEventListener('touchstart', function(e) {
                e.preventDefault(); // Previene zoom en algunos dispositivos
            }, { passive: false });
        });
        
        resetButton.addEventListener('click', resetGame);
    }

    // Configurar el juego de tres en raya si existe en la página
    if (document.getElementById('tictactoe-game')) {
        setupTicTacToe();
    }

    // Responsive handling
    function handleResize() {
        // Adjust any necessary elements for different screen sizes
        const isMobile = window.innerWidth < 768;
        
        // Adjust floating elements number
        const floatingElements = document.getElementById('floatingElements');
        if (floatingElements) {
            // Only adjust if there's a big change in viewport size
            if ((isMobile && floatingElements.children.length > 5) || 
                (!isMobile && floatingElements.children.length < 8)) {
                
                // Clear existing elements
                while (floatingElements.firstChild) {
                    floatingElements.removeChild(floatingElements.firstChild);
                }
                
                // Create appropriate number of elements
                const elementsCount = isMobile ? 5 : 10;
                const codeSnippets = [
                    '</>',
                    '<h1>Hello World</h1>',
                    'function secureCode() { }',
                    'const port = 443;',
                    'if (isVulnerable) { patch(); }',
                    'ssh -p 2222 user@server',
                    'SELECT * FROM users;'
                ];
                
                for (let i = 0; i < elementsCount; i++) {
                    const element = document.createElement('div');
                    element.classList.add('floating-element');
                    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                    element.textContent = randomSnippet;
                    element.style.setProperty('--random-x', Math.random());
                    element.style.left = `${Math.random() * 90}%`;
                    element.style.animationDelay = `${Math.random() * 10}s`;
                    floatingElements.appendChild(element);
                }
            }
        }
    }

    // Handle initial size and resize events
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove no-js class once JS is running
    document.body.classList.remove('no-js');
    
    // Fix for iOS vh units
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
});