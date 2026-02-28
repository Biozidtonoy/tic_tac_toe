const gameboard =(()=>{
    const board = ["","","","","","","","",""];

    const getBoard = ()=> board;

    const setMark = (index,marker)=>{
        if(index < 0 || index > 8 ) return false;
        if (board[index] !== "") return false;
            
        
        board[index] = marker;
        return true
        
    }
    const reset = ()=> board.fill("");

    return{getBoard, setMark,reset}
    
})();


function createPlayer(name, marker){
    return { name, marker };
}

const gameController = (()=>{
    const player1 = createPlayer("Tonoy","X");
    const player2 = createPlayer("biozid","O");
    
    
    let currentPlayer = player1;
    let gameActive = true;

    const switchPlayer = ()=>{
        if(currentPlayer === player1){
            currentPlayer = player2;
        }else{
            currentPlayer = player1;
        }
    };

    const checkWin = ()=>{
        const board = gameboard.getBoard();
        const marker = currentPlayer.marker;

        const winningCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

         return winningCombination.some(combination=>{
            const [a,b,c] = combination;
            return board[a] === marker &&
                    board[b] === marker &&
                    board[c] === marker;
         });
    };

    const checkDraw = ()=>{
        const board = gameboard.getBoard();
        return !board.includes("");
    }

    const playRound = (index) => {

        if (!gameActive) return { status: "inactive" };

        const moveSuccess = gameboard.setMark(index, currentPlayer.marker);

        if (!moveSuccess) return { status: "invalid" };

        if (checkWin()) {
            gameActive = false;
            return { status: "win", winner: currentPlayer.name };
        }

        if (checkDraw()) {
            gameActive = false;
            return { status: "draw" };
        }

        switchPlayer();

        return { status: "continue" };
    };
    

    const restartGame = ()=>{
        gameboard.reset();
        currentPlayer = player1;
        gameActive = true;
        console.log("Game restarted!");
    }

    return{playRound, restartGame}

})();


const displayController = (() => {

    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restart");
    const statusText = document.getElementById("status");

    const render = () => {
        const board = gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
             if (board[index] === "X") {
                cell.style.color = "green";   // X → green
            } 
            else if (board[index] === "O") {
                    cell.style.color = "red";     // O → red
            } 
            else {
                    cell.style.color = "black";   // empty cell reset
            }

        });
    };

    const handleClick = (e) => {
    const index = e.target.dataset.index;

    const result = gameController.playRound(Number(index));

    render();

    if (!result) return;

    if (result.status === "win") {
        statusText.textContent = ` ${result.winner} wins!`;
    } 
    else if (result.status === "draw") {
        statusText.textContent = "It's a draw!";
    }
};

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    restartBtn.addEventListener("click", () => {
        gameController.restartGame();
        render();
        statusText.textContent = "";
    });

    render();

})();