var startLocation;
var stopLocation;
var openList = [];
var closedList = [];
$(function(){
    blockedPercentage = .1;
    timeout = 300;
    ex = 17;
    why = 17;
    //new instance of Board class
    board = new $.Board();
    //array that holds a node for each square
    boardArray = createArray(ex,why);
    //array that holds random blocked square locations
    randomArray = board.getRandoms(ex,why);
    
    $('body').prepend(board.drawBoard(ex,why));
    
    
    
    
    
    var infoModal = 
       `<div class="ui mini modal">
            <div class="header">Some Info to Start:</div>
            <div class="content">
                <div class="ui ordered list">
                    <a class="item">Click on a square to pick your start point.</a>
                    <a class="item">Click on a different square to pick your end point.</a>
                    <div class="item">
                        <a>You will see:</a>
                        <div class="list">
                            <a class="item">Grey squares appearing. These are the current square the the algorithm is looking at to take measurements.</a>
                            <a class="item">When the algorithm has finished, it will highlight the start square, the path that it found, and the end square, yellow.</a>
                        </div>
                    </div>
                    <a class="item">There is a restart button at the bottom of the page which will let you do this over and over again.</a>
                    <a class="item">Click anywhere outside of this popup to dismiss it.</a>
                </div>
            </div>
        </div>`
    $('body').append(infoModal);
    $('.ui.mini.modal').modal('show');
    

});