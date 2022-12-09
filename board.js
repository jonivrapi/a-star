(function($){    
    $.Board = function(element){
        this.element = (element instanceof $) ? element : $(element);
    }
    
    $.Board.prototype = {
        drawBoard:function(x,y){
            var tableTop = '<table class="ui celled table"><tbody>';
            var tableBottom = '</tbody></table>';
            var board = tableTop;
            var background;
            var counter = 0;
            var flag = false;
            for(i = 0;i < y;i++){
                board += '<tr>';
                for(j = 0;j < x;j++){
                    if(y == 0 || x == 0 || y == 16 || x == 16){
                        flag = true
                    }else{
                        flag = this.checkForBlocked(counter);
                    }                    
                    if(flag){
                        boardArray[i][j] = new $.Node(0,0,0,null,1,j,i);
                        background = "black";
                    }else{
                        boardArray[i][j] = new $.Node(0,0,0,null,0,j,i);
                        background = "white";
                    }
                    board += '<td id="'+j+'_'+i+'" onclick="board.startStopPicker($(this));" style="background:'+background+';"></td>';
                    counter++;
                }
                board += '</tr>'
            }
            board += tableBottom;
            return board;
        },
        printHeuristic:function(){
            var container;
            var x;
            var y;
            var h;
            var cache;
            
            var stopX = Number(stopLocation.split('_')[0] - 1);
            var stopY = Number(stopLocation.split('_')[1] - 1);
            
            $.each($('td'),function(index,element){
                cache = $(element).attr('id').split('_');
                x = Number(cache[0]) - 1;
                y = Number(cache[1]) - 1;
                h = (Math.abs(x - stopX) + Math.abs(y - stopY)) * 10;
                container = '<code class="h">H: '+ h +'</code>';
                $(element).append(container);
                boardArray[y+1][x+1]._setH(h);
            });
        },
        calculatePath:function(x,y){            
            function containsObject(list,obj) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i]._getX() === obj._getX() && list[i]._getY() === obj._getY()) {
                        return true;
                    }
                }

                return false;
            }
            
            if(!(x && y)){
                var $startNode = $('[start=true]');
                var startCoordinates = $startNode.attr('id').split('_');
                var X = Number(startCoordinates[0]);
                var Y = Number(startCoordinates[1]);
                
                openList.push(boardArray[Y][X]);
                
                this.calculateGScores(X,Y);
                
                closedList.push(boardArray[Y][X]); 
            }else{
                if(!containsObject(closedList,boardArray[y][x]))
                    closedList.push(boardArray[y][x]);
                this.calculateGScores(x,y);
            }            
        },
        calculateGScores:function(x,y){
            $('#'+x+'_'+(y)+'').css('background','grey');
            var node = boardArray[y][x];
            
            /*if(y + 1 > 14)
                y = 13
            if(x + 1 > 14)
                x = 13
            if(y - 1 < 0)
                y = 1
            if(x - 1 < 0)
                x = 1*/
            
            
            if(y == 15){
                var one = boardArray[y][x];
            }else{
                var one = boardArray[y+1][x];
            }
            
            if(y == 0){
                var two = boardArray[y][x];
            }else{
                var two = boardArray[y-1][x];
            }
            
            if(x == 15){
                var three = boardArray[y][x];
            }else{
                var three = boardArray[y][x+1];
            }
            
            if(x == 0){
                var four = boardArray[y][x];
            }else{
                var four = boardArray[y][x-1];
            }
            
            if(y == 15 && x == 15){
                var five = boardArray[y][x];
            }else if(y == 15 && x != 15){
                var five = boardArray[y][x+1];
            }else if(x == 15 && y != 15){
                var five = boardArray[y+1][x];     
            }else{
                var five = boardArray[y+1][x+1];
            }
            
            if(y == 0 && x == 15){
                var six = boardArray[y][x];
            }else if(y == 0 && x != 15){
                var six = boardArray[y][x+1];
            }else if(x == 15 && y != 0){
                var six = boardArray[y-1][x];     
            }else{
                var six = boardArray[y-1][x+1];
            }
            
            if(y == 0 && x == 0){
                var seven = boardArray[y][x];
            }else if(y == 0 && x != 0){
                var seven = boardArray[y][x-1];
            }else if(x == 0 && y != 0){
                var seven = boardArray[y-1][x];     
            }else{
                var seven = boardArray[y-1][x-1];
            }
            
            if(y == 15 && x == 0){
                var eight = boardArray[y][x];
            }else if(y == 15 && x != 0){
                var eight = boardArray[y][x-1];
            }else if(x == 0 && y != 15){
                var eight = boardArray[y+1][x];     
            }else{
                var eight = boardArray[y+1][x-1];
            }           
            
            function containsObject(list,obj) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i] == obj) {
                        return true;
                    }
                }

                return false;
            }
            
            function containsObjectReturnObject(list,obj) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i]._getX() === obj._getX() && list[i]._getY() === obj._getY()) {
                        return list[i];
                    }
                }

                return false;
            }
            function removeArrayItem(object){
                var index = openList.indexOf(object);
                if(index > -1){
                    openList.splice(index, 1);
                }
            }
            
            //laterals
            try{
                if(one._getType() == false && !containsObject(closedList,one)){
                    if(!containsObject(openList,one)){
                        openList.push(one);
                        this.sort();
                        one._setParent(node);
                        one._setG(one._getParent()._getG() + 10);
                        this.calculateFScore(one);
                        $('#'+x+'_'+(y+1)+'').find('.g').remove();
                        $('#'+x+'_'+(y+1)+'').append('<code class="g">G: '+one._getG()+'</code>');
                    }else{                        
                        var tempGScore = node._getG() + 10;
                        if(tempGScore > one._getG() && !containsObject(closedList,one)){
                            removeArrayItem(node);
                            closedList.push(one);   
                        }                        
                    }
                }
            }catch(e){}
            
            try{
                if(two._getType() == false && !containsObject(closedList,two)){
                    if(!containsObject(openList,two)){
                        openList.push(two);
                        this.sort();
                        two._setParent(node);
                        two._setG(two._getParent()._getG() + 10);
                        this.calculateFScore(two);
                        $('#'+x+'_'+(y-1)+'').find('.g').remove();
                        $('#'+x+'_'+(y-1)+'').append('<code class="g">G: '+two._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 10;
                        if(tempGScore > two._getG() && !containsObject(closedList,two)){
                            removeArrayItem(node);
                            closedList.push(two);   
                        }
                    }
                }
            }catch(e){}
            
            try{
                if(three._getType() == false && !containsObject(closedList,three)){
                    if(!containsObject(openList,three)){
                        openList.push(three);
                        this.sort();
                        three._setParent(node);
                        three._setG(three._getParent()._getG() + 10);
                        this.calculateFScore(three);
                        $('#'+(x+1)+'_'+y+'').find('.g').remove();
                        $('#'+(x+1)+'_'+y+'').append('<code class="g">G: '+three._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 10;
                        if(tempGScore > three._getG() && !containsObject(closedList,three)){
                            removeArrayItem(node);
                            closedList.push(three);   
                        }
                    }
                }
            }catch(e){}
            
            try{
                if(four._getType() == false && !containsObject(closedList,four)){
                    if(!containsObject(openList,four)){
                        openList.push(four);
                        this.sort();
                        four._setParent(node);         
                        four._setG(four._getParent()._getG() + 10);
                        this.calculateFScore(four);
                        $('#'+(x-1)+'_'+y+'').find('.g').remove();
                        $('#'+(x-1)+'_'+y+'').append('<code class="g">G: '+four._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 10;
                        if(tempGScore > four._getG() && !containsObject(closedList,four)){
                            removeArrayItem(node);
                            closedList.push(four);   
                        }
                    }
                }
            }catch(e){}
            
            //diagonals
            try{
                if(five._getType() == false && !containsObject(closedList,five)){
                    if(!containsObject(openList,five)){
                        openList.push(five);
                        this.sort();
                        five._setParent(node);
                        five._setG(five._getParent()._getG() + 14);
                        this.calculateFScore(five);
                        $('#'+(x+1)+'_'+(y+1)+'').find('.g').remove();
                        $('#'+(x+1)+'_'+(y+1)+'').append('<code class="g">G: '+five._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 14;
                        if(tempGScore > five._getG() && !containsObject(closedList,five)){
                            removeArrayItem(node);
                            closedList.push(five);   
                        }
                    }
                }
            }catch(e){}
            
            try{
                if(six._getType() == false && !containsObject(closedList,six)){
                    if(!containsObject(openList,six)){
                        openList.push(six);
                        this.sort();
                        six._setParent(node);
                        six._setG(six._getParent()._getG() + 14);
                        this.calculateFScore(six);
                        $('#'+(x+1)+'_'+(y-1)+'').find('.g').remove();
                        $('#'+(x+1)+'_'+(y-1)+'').append('<code class="g">G: '+six._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 14;
                        if(tempGScore > six._getG() && !containsObject(closedList,six)){
                            removeArrayItem(node);
                            closedList.push(six);   
                        }
                    }
                }
            }catch(e){}
                
            try{
                if(seven._getType() == false && !containsObject(closedList,seven)){
                    if(!containsObject(openList,seven)){
                        openList.push(seven);
                        this.sort();
                        seven._setParent(node);
                        seven._setG(seven._getParent()._getG() + 14);
                        this.calculateFScore(seven);
                        $('#'+(x-1)+'_'+(y-1)+'').find('.g').remove();
                        $('#'+(x-1)+'_'+(y-1)+'').append('<code class="g">G: '+seven._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 14;
                        if(tempGScore > seven._getG() && !containsObject(closedList,seven)){
                            removeArrayItem(node);
                            closedList.push(seven);   
                        }
                    }
                }
            }catch(e){}
                
            try{
                if(eight._getType() == false && !containsObject(closedList,eight)){
                    if(!containsObject(openList,eight)){
                        openList.push(eight);
                        this.sort();
                        eight._setParent(node);
                        eight._setG(eight._getParent()._getG() + 14);
                        this.calculateFScore(eight); 
                        $('#'+(x-1)+'_'+(y+1)+'').find('.g').remove();
                        $('#'+(x-1)+'_'+(y+1)+'').append('<code class="g">G: '+eight._getG()+'</code>');
                    }else{
                        var tempGScore = node._getG() + 14;
                        if(tempGScore > eight._getG() && !containsObject(closedList,eight)){
                            removeArrayItem(node);
                            closedList.push(eight);   
                        }
                    }
                }
            }catch(e){}
            
            this.continueAStar();
            
        },
        calculateFScore:function(node){
            node._setF(node._getG() + node._getH());
            
            $('#'+node._getX()+'_'+node._getY()+'').find('.f').remove();
            $('#'+node._getX()+'_'+node._getY()+'').append('<code class="f">F: '+node._getF()+'</code>');
        },
        continueAStar:function(){
            this.sort();
            var minFNode = openList[0];
            //console.log(minFNode)
            openList.shift();
            var splitID = $('[start=false]').attr('id').split('_');
            
            function highlightPath(x,y){
                var endNode = boardArray[y][x];
                while(endNode._getParent() != null){
                    endNode = endNode._getParent();
                    $('#'+(endNode._getX())+'_'+(endNode._getY())+'').css('background','yellow');
                    $('#'+(splitID[0])+'_'+(splitID[1])+'').css('background','yellow');
                }
            }
            
            try{
                if(minFNode._getX() == splitID[0] && minFNode._getY() == splitID[1]){
                    highlightPath(splitID[0],splitID[1]);
                }else{
                    for(i = 1; i < openList.length; i++){
                        if(openList[i]._getF() < minFNode._getF()){
                            minFNode = openList[i];
                        }
                    }
                    var $that = this;
                    setTimeout(function(){
                        $that.calculatePath(minFNode._getX(),minFNode._getY())
                    },timeout);
                }
            }catch(e){
                alert('No path could be found.')
            }
        },
        sort:function(){
            openList.sort(function(a,b){
                return a._getF() - b._getF();
            });
        },
        getRandoms:function(x,y){
            var randomArray = [];
            for(i = 0; i < (x * y); i++){
                randomArray[i] = i+1;
            }
            
            shuffle(randomArray);
            randomArray.length = Math.floor(x * y * blockedPercentage);
            
            //implementation of the Fisher-Yates shuffle Algorithm
            function shuffle(a) {
                var j, x, i;
                for (i = a.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = a[i];
                    a[i] = a[j];
                    a[j] = x;
                }
            }
            
            return randomArray;
        },
        checkForBlocked: function(cellNumber){
            for(k = 0; k < randomArray.length; k++){
                if(cellNumber === randomArray[k])
                    return true;
            }
            return false;
        },
        startStopPicker:function($that){
            var modal = 
                `<div class="ui basic modal" id="selectionModal">
                    <div class="ui icon header">
                        <i class="play icon"></i>
                        Is this your <span class="underline">Start</span> or <span class="underline">Stop</span> position?
                    </div>
                    <div class="actions">
                        <div class="ui red basic cancel inverted button" style="display:none;">
                            <i class="remove icon"></i>
                            Stop
                        </div>
                        <div class="ui green ok inverted button">
                            <i class="checkmark icon"></i>
                            Start
                        </div>
                    </div>
                </div>`;
            
            $('body').append(modal);
            $('#selectionModal')
                .modal({
                    onApprove:function($element){
                        $that.css('background','green');
                        $that.attr('start','true');
                        startLocation = $that.attr('id');
                        $('.ui.red.basic.cancel.inverted.button').attr('style','display:inline-block;');
                        $('.ui.green.ok.inverted.button').attr('style','display:none;');
                    },
                    onDeny:function($element){
                        $that.css('background','red');
                        $that.attr('start','false');
                        stopLocation = $that.attr('id');
                        $('td').attr('onclick','');
                        board.printHeuristic();
                        board.calculatePath();
                    }
                })
                .modal('show');
        }
    }
}(jQuery));