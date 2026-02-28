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

console.log(gameboard.getBoard());
console.log(gameController.playRound(0));
console.log(gameboard.getBoard());
console.log(gameController.playRound(1));
console.log(gameboard.getBoard());
console.log(gameController.playRound(2));
console.log(gameboard.getBoard());
console.log(gameController.playRound(3));
console.log(gameboard.getBoard());
console.log(gameController.playRound(5));
console.log(gameboard.getBoard());
console.log(gameController.playRound(4));
console.log(gameboard.getBoard());
console.log(gameController.playRound(6));
console.log(gameboard.getBoard());
console.log(gameController.playRound(8));
console.log(gameboard.getBoard());
console.log(gameController.playRound(7));
console.log(gameboard.getBoard());
