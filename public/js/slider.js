$(document).ready(function(){
    divWidth = $('#sliderBoard').width();       //div的寬度
    imgCount = $('#content li').length;

    for(let i=0; i<imgCount; i++){
        $('#contentButton').append(`<li></li>`);
    }
    $('#contentButton li:nth-child(1)').addClass('clickMe');

    $('#content li').width(divWidth);           //li的寬度
    $('#content').width(divWidth * imgCount);   //ul的寬度

    index = 0;
    $('#contentButton li').click(function(){
        // alert($(this).index());
        index = $(this).index();

        $('#content').animate({
            left: index * divWidth * -1,
        });

        $(this).addClass('clickMe');
        $('#contentButton li').not(this).removeClass('clickMe');
    });

    $(window).resize(function () {
    
        divWidth = $("#sliderBoard").width();
        imgCount = $("#content li").length;
        $("#content>li").width(divWidth);
        $("#content").width(divWidth * imgCount);
        $("#content").css({
            left: divWidth * index * -1
        });
    });

    setInterval(func,4000)
   
    
    function func(){
        for (var i = 0; i < imgCount; i++) {
            
            if(i == index % imgCount) { 
                $($('#contentButton li')[i]).addClass('clickMe');
            } else {
                $($('#contentButton li')[i]).removeClass('clickMe');
            } 
           
        } 

        $("#content").animate({
            left: divWidth * index *  -1
        });
        index++;
        if (index >= imgCount) {
             index = 0;
         }
    }
    
    
});