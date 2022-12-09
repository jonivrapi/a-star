$(function(){
    $('tr').eq($('tr').length - 1).css('display','none');
    $('tr').eq(0).css('display','none');
    
    $.each($('tr'),function(index, element){
        $(element).find('td').eq($(element).find('td').length - 1).css('display','none');
        $(element).find('td').eq(0).css('display','none');
    });
});

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}