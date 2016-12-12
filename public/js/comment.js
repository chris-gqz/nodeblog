var perpage  = 10;  //每页显示多少条
var page=1;        //当前页数
var pages=0;       //总页数
var comments = []

$('#messageBtn').on('click',function(){
    $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid:$('#contentId').val() ,
            content:$('#messageContent').val()
        },
        success:function(responseData){
            $('#messageContent').val('');
            comments=responseData.data.comments;
            renderComment();
        }
    })
})

function renderComment(){
    $('#messageCount').html(comments.length);
   pages= Math.max(Math.ceil(comments.length/perpage),1);
    var start = Math.max(0,(page-1)*perpage);
    var end = Math.min(start+perpage,comments.length);
    var $lis = $('.pager li');
    $lis.eq(1).html( page+'/'+ pages);
    if(page<=1){
        page = 1;
        $lis.eq(0).html('<span>没有上一页</span>')
    }else{
        $lis.eq(0).html('<a href="javascript:;">上一页</a>')
    }
    if(page>=pages){
        page = pages;
        $lis.eq(2).html('<span>没有下一页</span>')
    }else{
        $lis.eq(2).html('<a href="javascript:;">下一页</a>')
    }


    if(comments.length==0){
        $('.messageList').html('<div class="messageBox" style="margin-top: 10px;padding: 10px 0 ;"><p class="nomessage">还没有评论</p></div>');
    }else{
        var html = '';
        for (var i=start;i<end;i++){
            html+=' <div class="messageBox" style="margin-top: 16px;padding: 10px 0 ;"> <p class="name clear"><span class="fl">'+comments[i].username+'</span><span class="fr">'+formatData (comments[i].postTime)+'</span></p><p class="fl">'+comments[i].content+'</p> </div>'
            $('.messageList').html(html);
        }
    }
}


$.ajax({
    url:'/api/comment',
    data:{
        contentid:$('#contentId').val() ,
    },
    success:function(responseData){
        $('#messageContent').val('');
        comments=responseData.data;
        renderComment();
    }
});

$('.pager').delegate('a','click',function(){
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment();
});

function formatData(d){
    var date1 = new Date(d);
    return date1.getFullYear()+'年'+date1.getMonth()+'月'+date1.getDate()+'日'+
            date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds();
}
