let game = {

    table: [], //direction's names in thi board
    nbDirection: -1,
    repetition: 0, //lines of board
    columnPosition: [],
    linePosition: [],
    direction: [1], //direction of arrow
    finishGame: 0, //nb of repetition
    displayError: "",

    init() {
        game.addRow();
        game.selectColumn();
        game.getPath();
        game.button();
        game.lauchGame();
    },

    addRow() {
        let board = document.getElementById('board');
        for (let nbRow = 0; nbRow < 4; nbRow++) {
            let cellRow = document.createElement('div');
            cellRow.classList.add('cellRow');
            cellRow.id = `row${nbRow + 1}`;
            board.appendChild(cellRow);
        }
    },

    selectColumn() {
        let cellRow = document.querySelectorAll('.cellRow');
        cellRow.forEach(element => {
            game.addColumn(element);
        })
    },

    addColumn(param) {
        for (let nbCell = 0; nbCell < 6; nbCell++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(`cell${nbCell + 1}`);
            param.appendChild(cell);
        }

    },

    getPath() {
        let lineStart = Math.trunc(Math.random() * (5 - 1) + 1);
        let columnStart = Math.trunc(Math.random() * (6 - 1) + 1);
        let startingLine = document.querySelector(`#row${lineStart}`);
        let startingColumn = startingLine.querySelector(`.cell${columnStart}`);
        startingColumn.classList.add('gameStart');
        startingColumn.classList.add('current');
        game.columnPosition.push(columnStart);
        game.linePosition.push(lineStart);

        let current = document.querySelector('.current');
        current.textContent = ">";

        let lineEnd = Math.trunc(Math.random() * (5 - 1) + 1);
        let columnEnd = Math.trunc(Math.random() * (6 - 1) + 1);

        if (lineStart === lineEnd && columnStart === columnEnd) {
            let lineEnd = Math.trunc(Math.random() * (5 - 1) + 1);
            let columnEnd = Math.trunc(Math.random() * (6 - 1) + 1);
        }

        let arrivalLine = document.querySelector(`#row${lineEnd}`);
        let arrivalColumn = arrivalLine.querySelector(`.cell${columnEnd}`);
        arrivalColumn.classList.add('gameEnd');
    },

    button() {
        let buttons = document.querySelectorAll('.buttonDirection');
        buttons.forEach(element => {
            game.eventButton(element);
        });
    },

    eventButton(element) {
        element.addEventListener('click', function () {
            game.nbDirection++;
            let test = element.textContent;
            game.table.push(test);
            let html_li = document.createElement('li');
            html_li.textContent = test;
            html_li.id = game.nbDirection;
            html_li.addEventListener('click', game.changeDirection);
            let board = document.querySelector('ol');
            board.appendChild(html_li);
        });
    },

    changeDirection(event) {
        let direction = event.target;
        let createInput = document.createElement('input');
        direction.appendChild(createInput);

        createInput.addEventListener('blur', function () {
            let modification = createInput.value;
            if(modification.toUpperCase()!="AVANCER" && modification.toUpperCase() != "DROITE" && modification.toUpperCase()!="GAUCHE") {
                alert('veuillez faire un choix entre les trois commandes');
                direction.textContent="???";
            } else {
                direction.textContent = modification;
                game.table[direction.id] = modification;
            }
            
        });

        createInput.addEventListener('keypress', function (event) {
            if (event.code === "Enter") {
                let modification = createInput.value;
                direction.textContent = modification;
                game.table[direction.id] = modification;
            }
        });
    },

    lauchGame() {
        let buttonStart = document.getElementById('launchScript');
        buttonStart.addEventListener('click', game.testInterval);
    },

    startGame() {
        let fin = game.table.length;
        if (game.repetition == fin) {
            game.clearInterval2();
        } else {
            game.playGame(game.table[game.repetition]);
            game.repetition++;
            game.finishGame++;
            if (game.finishGame == fin) {
                game.clearInterval2();
                game.finish();
            }
        }

    },

    playGame(element) {
        let direction = element.toUpperCase();
        switch (direction) {
            case "AVANCER":
                game.movingForward(direction);
                break;
            case "DROITE":
                game.turnRight();
                break;
            case "GAUCHE":
                game.turnLeft();
                break;
            default:
                console.log('la commande n\'existe pas');
        }
    },

    testInterval() {
        let interval = setInterval(game.startGame, 1000);
        return interval;
    },

    clearInterval2() {
        clearInterval(game.testInterval);
    },

    movingForward(element) {
        game.error_line_position(element);
        let currentPosition = document.querySelector('.current');
        switch (game.direction[0]) {
            case 1:
                currentPosition.classList.remove('current');
                currentPosition.textContent = "";
                game.columnPosition[0] = Number(game.columnPosition[0])+1;

                currentPosition.nextElementSibling.classList.add('current');
                currentPosition.nextElementSibling.textContent = ">";

                break;
            case 2:
                currentPosition.classList.remove('current');
                currentPosition.textContent = "";
                game.linePosition[0] = Number(game.linePosition[0]) + 1;

                let futureLine = document.querySelector(`#row${game.linePosition[0]}`);
                let futurColumn = futureLine.querySelector(`.cell${game.columnPosition[0]}`);
                futurColumn.classList.add('current');
                futurColumn.textContent = ">";
                futurColumn.style.transform = 'rotate(90deg)';

                break;
            case 3:
                currentPosition.classList.remove('current');
                currentPosition.textContent = "";
                game.columnPosition[0] = Number(game.columnPosition[0]) - 1;

                let line = document.querySelector(`#row${game.linePosition[0]}`);
                let previousColumn = line.querySelector(`.cell${game.columnPosition[0]}`);
                previousColumn.classList.add('current');
                previousColumn.textContent = ">";
                previousColumn.style.transform = 'rotate(180deg)';
                break;
            case 4:
                currentPosition.classList.remove('current');
                currentPosition.textContent = "";
                game.linePosition[0] = Number(game.linePosition[0]) - 1;
                let previousLine = document.querySelector(`#row${game.linePosition[0]}`);
                let Column = previousLine.querySelector(`.cell${game.columnPosition[0]}`);
                Column.classList.add('current');
                Column.textContent = ">";
                Column.style.transform = 'rotate(270deg)';
                break;
        }
    },

    error_line_position(element) {
        if (game.linePosition[0] === 1 && game.direction[0] === 4 && element == "AVANCER") {
            game.finish(); 
            return false;
                       
        } else if (game.linePosition[0] === 4 && game.direction[0] === 2 && element == "AVANCER") {
            game.finish(); 
            return false;                      
        }
        for (let n = 1; n < 4; n++) {
            if (game.linePosition[0] === n && game.direction[0] === 1 && game.columnPosition[0] === 6 && element == "AVANCER") {
                game.finish(); 
                return false;                       
            }
        }
        for (let n = 1; n < 4; n++) {
            if (game.linePosition[0] === n && game.direction[0] === 3 && game.columnPosition[0] === 1 && element === "AVANCER") {
                game.finish(); 
                return false;                       
            }
        }
    },

    turnRight() {
        let currentPosition = document.querySelector('.current');

        if (game.direction == 2) {
            currentPosition.style.transform = 'rotate(180deg)';
            game.direction = [3];

        } else if (game.direction == 1) {
            currentPosition.style.transform = 'rotate(90deg)';
            game.direction = [2];
        } else if (game.direction == 3) {
            currentPosition.style.transform = 'rotate(270deg)';
            game.direction = [4];
        } else if (game.direction == 4) {
            currentPosition.style.transform = 'rotate(360deg)';
            game.direction = [1];
        }
    },

    turnLeft() {
        if (game.direction == 1) {
            let currentPosition = document.querySelector('.current');
            currentPosition.style.transform = 'rotate(270deg)';
            game.direction = [4];

        } else if (game.direction == 2) {
            let currentPosition = document.querySelector('.current');
            currentPosition.style.transform = 'rotate(360deg)';
            game.direction = [1];
        } else if (game.direction == 3) {
            let currentPosition = document.querySelector('.current');
            currentPosition.style.transform = 'rotate(90deg)';
            game.direction = [2];
        } else if (game.direction == 4) {
            let currentPosition = document.querySelector('.current');
            currentPosition.style.transform = 'rotate(180deg)';
            game.direction = [3];
        }
    },

    finish() {
        let message = document.querySelector('.resultat');
        let resultat = document.querySelector('.gameEnd');
        let pageEnd = document.querySelector('#pageEnd');
        let body = document.querySelector('body');
        body.classList.add('modal-open');

        let modalShow = document.createElement('div');
        modalShow.classList.add('modal-backdrop');
        modalShow.classList.add('fade');
        modalShow.classList.add('show');
        pageEnd.appendChild(modalShow);

        let modal = document.querySelector('.modal');
        modal.classList.add('show');
        modal.style.display = 'block';

        if (resultat.textContent == ">") {
            modal.style.backgroundImage = "url(docs/giphy.gif)";
            message.textContent = "BRAVO!";
            let audio = new Audio('docs/bravo.mp3');
            audio.play();
        } else {
            modal.style.backgroundImage = "url(docs/giphy2.gif)";
            message.textContent = "DOMMAGE...";
            let audio = new Audio('docs/dommage.mp3');
            audio.play();
        } 
        
        setTimeout(function () {
            document.location.reload(true);
        }, 2000)
    },
}

game.init();
