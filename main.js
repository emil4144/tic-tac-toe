
                                    //GLOBAL
var board, score, winner,winning,turnus, PlayerQuant,AIPlayer,hPlayer;
function checkWinner(){
    if(board[0][0]==board[0][1]&&
        board[0][0]==board[0][2]&&
        board[0][0]!=""){
        winner=board[0][0];
        winning=true; 
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }
    }
    if(board[1][0]==board[1][1]&&
        board[1][0]==board[1][2]&&
        board[1][0]!=""){
        winner=board[1][0];
        winning=true;
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }               
    }
    if(board[2][0]==board[2][1]&&
        board[2][0]==board[2][2]&&
        board[2][0]!=""){
        winner=board[2][0];
        winning=true; 
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }        
    }
    if(board[0][0]==board[1][0]&&
        board[0][0]==board[2][0]&&
        board[0][0]!=""){
        winner=board[0][0];
        winning=true;  
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }   
    }
    if(board[0][1]==board[1][1]&&
        board[0][1]==board[2][1]&&
        board[0][1]!=""){
        winner=board[0][1];
        winning=true;  
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }    
    }
    if(board[0][2]==board[1][2]&&
        board[0][2]==board[2][2]&&
         board[0][2]!=""){
        winner=board[0][2];
        winning=true;  
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }          
    }
    if(board[0][0]==board[1][1]&&
        board[0][0]==board[2][2]&&
        board[0][0]!=""){
        winner=board[0][0];
        winning=true;   
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }   
    }
    if(board[0][2]==board[1][1]&&
        board[0][2]==board[2][0]&&
         board[0][2]!=""){
        winner=board[0][2];
        winning=true; 
        if(winner=="X")  {
            score.X++
        }  
        else{
            score.O++
        }         
    } 
    if(board[0][0]!=""&&
    board[0][1]!=""&&
    board[0][2]!=""&&
    board[1][0]!=""&&
    board[1][1]!=""&&
    board[1][2]!=""&&
    board[2][0]!=""&&
    board[2][1]!=""&&
    board[2][2]!=""){
        winner="Draw"
        winning=true;      
    }
}
function onPlay(x,y){
    if(PlayerQuant==2){
        onTwoPlay(x,y)
    }
    else if(PlayerQuant=1){
        onOnePlay(x,y)
    }
}    
                               //TWO PLAYER GAME
function loadTwoPlayer(){
    board=[["","",""],["","",""],["","",""]];
    score={X:0,O:0};
    winner=""; 
    winning=false;
    turnus="X";
    PlayerQuant=2;  
}
function onTwoPlay(x,y){
    if (board[x][y]=="" && winning==false ){
        board[x][y]=turnus;
        checkWinner()
        turnus=="X"?turnus="O":turnus="X";        
    }
}
                                    //ONE PLAYER
function loadOnePlayer(AI){
    board=[["","",""],["","",""],["","",""]];
    score={X:0,O:0};
    winner=""; 
    winning=false;
    turnus="X";
    PlayerQuant=1;  
    AIPlayer=AI;
    if(AI=="O"){
        hPlayer="X"
    }
    else{
        hPlayer="O"
    }
    if(turnus==AIPlayer){
        AIRandomPlay()
    }
}
function onOnePlay(x,y){
    if (board[x][y]=="" && winning==false && turnus!=AIPlayer ){
        board[x][y]=turnus;
        checkWinner()
        turnus=turnus=="X"?"O":"X";
        AIPlay()
    }
}
function AIRandomPlay(){
    if (winning==false && turnus==AIPlayer ){
        setTimeout(function(){
            let i=Math.floor(Math.random()*3)
            let j=Math.floor(Math.random()*3)
            board[i][j]=turnus;
            checkWinner()      
            turnus= turnus=="X"?"O":"X";
            onAiPlayUi(i,j)
        },1000)
    }
}
function AIPlay(){
    if (winning==false && turnus==AIPlayer ){ 
        setTimeout(function(){
            var bestmove= minimax(board,AIPlayer)
            board[bestmove.brd.i][bestmove.brd.j]=turnus  
            console.log(board)
            checkWinner()      
            turnus= turnus=="X"?"O":"X";
            onAiPlayUi(bestmove.brd.i,bestmove.brd.j)
        },1000)
       
    }    
}
function isWinn(board,player){
    if(
        (board[0][0]==player&&board[0][1]==player&&board[0][2]==player)||
        (board[1][0]==player&&board[1][1]==player&&board[1][2]==player)||
        (board[2][0]==player&&board[2][1]==player&&board[2][2]==player)||
        (board[0][0]==player&&board[1][0]==player&&board[2][0]==player)||
        (board[0][1]==player&&board[1][1]==player&&board[2][1]==player)||
        (board[0][2]==player&&board[1][2]==player&&board[2][2]==player)||
        (board[0][2]==player&&board[1][1]==player&&board[2][0]==player)||
        (board[0][0]==player&&board[1][1]==player&&board[2][2]==player)
    ){
        return true
    }
    return false
}
function isDraw(board){
    if(board[0][0]!=""&&
    board[0][1]!=""&&
    board[0][2]!=""&&
    board[1][0]!=""&&
    board[1][1]!=""&&
    board[1][2]!=""&&
    board[2][0]!=""&&
    board[2][1]!=""&&
    board[2][2]!=""){
        return true     
    }
    return false
}
function minimax(board,player){
    if(isWinn(board,AIPlayer)){
        return {
            score:1
        }
    }
    else if (isWinn(board,hPlayer)){
        return {
            score:-1
        }
    }
    else if(isDraw(board)){
        return {
            score:0
        }
    }
    let moves=[]
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
           if(board[i][j]==""){
               let move={}
               move.brd={i:i,j:j}
               move.brd.pl=player
                board[i][j]=player
                if(player==AIPlayer){
                    let result = minimax(board, hPlayer);
                    move.score = result.score;
                }
                else {
                    let result = minimax(board, AIPlayer);
                    move.score = result.score;
                }
                board[i][j]=""
                moves.push(move)
            }
        }
    }    
    let bestMove;
   if (player === AIPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {     
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove]
}


//UI PART
function onPlayUI(x,y){
    onPlay(x,y);
    
    var node=x.toString()+y;
    document.getElementById("player").innerHTML="Player: "+turnus
    document.getElementById(node).innerHTML=board[x][y];
    
    if (winning){
        document.getElementById("windialog").style.display="block"
        document.getElementById("windialog1").style.display="block"
        if(winner!="Draw"){
            document.getElementById("windialog").innerHTML="Winner: "+winner
        }
        else{
            document.getElementById("windialog").innerHTML=winner
        }        
    }   
}
function loadTwoPlayerUI(){
    loadTwoPlayer()
    document.getElementById("btncont").style.display="none";
    document.getElementById("xoContainer").style.display="inline-flex";
    document.getElementById("detail").style.display="inline-block" ;
    document.getElementById("player").innerHTML="Player: "+turnus;
    document.getElementById("xScore").innerHTML="X: "+score.X
    document.getElementById("oScore").innerHTML="O: "+score.O
}
function loadOnePlayerUI(){
    var AI
    if(document.getElementById("playerx").checked){
       AI="O" 
    }
    else if(document.getElementById("playero").checked){
        AI="X" 
     }
    loadOnePlayer(AI)
    document.getElementById("btncont").style.display="none";
    document.getElementById("xoContainer").style.display="inline-flex";
    document.getElementById("detail").style.display="inline-block" ;
    document.getElementById("player").innerHTML="Player: "+turnus
    document.getElementById("xScore").innerHTML="X: "+score.X
    document.getElementById("oScore").innerHTML="O: "+score.O
}
function onAiPlayUi(x,y){
    var node=x.toString()+y;
    document.getElementById(node).innerHTML=board[x][y];
    document.getElementById("player").innerHTML="Player: "+turnus;
    if (winning){
        document.getElementById("windialog").style.display="block"
        document.getElementById("windialog1").style.display="block"
        if(winner!="Draw"){
            document.getElementById("windialog").innerHTML="Winner: "+winner
        }
        else{
            document.getElementById("windialog").innerHTML=winner
        }        
    }     
}
function gameBoardLoad(){
    document.getElementById("btncont").style.display="block";
    document.getElementById("xoContainer").style.display="none";
    document.getElementById("detail").style.display="none";
}

function reload(){
    location.reload()
}
function continueGame(){
    board=[["","",""],["","",""],["","",""]];
    winner=""; 
    winning=false;
    turnus="X";   
}

/*function sort(arr){
    var el=[]
    for(let i=1; i<arr.length;i++){
        var key=arr[i];
        var j=i-1;
        while(j>=0 && arr[j]>key){
            arr[j+1]=arr[j]
            j=j-1;
        }
        arr[j+1]=key
    }              
    for(let i=0;i<arr.length;i++){   
       let s=1;  
       let e=arr[i]          
        for(let j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                s++
                i++
            }            
        }
        el.push([e,s])             
    }
    for(let i=1;i<el.length;i++){
        var k=el[i][1]
        var k0=el[i][0]
        j=i-1
        while(j>=0 && el[j][1]>k){
            el[j+1][1]=el[j][1]
            el[j+1][0]=el[j][0]
            j=j-1;            
        }
        el[j+1][0]=k0
        el[j+1][1]=k
    }
    arr=[]
        for(let j=0;j<el.length;j++){
            var k=0
            while(k<el[j][1]){
                arr.push(el[j][0])
                k++
            }
        }   
    console.log(arr)
}*/










