(function($){
    $.Node = function(f,g,h,p,t,x,y){
        this.F = f;
        this.G = g;
        this.H = h;
        this.parent = p;
        this.type = t;
        this.X = x;
        this.Y = y;
    }
    
    $.Node.prototype = {
        _setF: function(value){
            this.F = value;
        },
        _setG: function(value){
            this.G = value;
        },
        _setH: function(value){
            this.H = value;
        },
        _setParent: function(value){
            this.parent = value;
        },
        _setType: function(value){
            this.type = value;
        },
        _setX: function(value){
            this.X = value;
        },
        _setY: function(value){
            this.Y = value;
        },
        _getF: function(){
            return this.F;
        },
        _getG: function(){
            return this.G;
        },
        _getH: function(){
            return this.H;
        },
        _getParent: function(){
            return this.parent;
        },
        _getType: function(){
            return this.type;
        },
        _getX: function(){
            return this.X;
        },
        _getY: function(){
            return this.Y;
        }
    }
}(jQuery));