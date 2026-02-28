const gameboard =(()=>{
    const board = ["","","","","","","","",""];

    const getBoard = ()=> board;

    const setMark = (index,marker)=>{
        if(index < 0 || index > 8 ) return false;
        if (board[index] !== "") return false;
            
        
        let mark = marker.toUpperCase();
        board[index] = mark;
        return true
        
    }
    const reset = ()=> board.fill("");

    return{getBoard, setMark,reset}
    
})();


function createPlayer(name,marker){
    const getName = ()=>{
        return `player name  : ${name}`
    }
    const getMarker = ()=>{
        return `player  marker : ${marker}`
    }
    return{getName,getMarker}
}




