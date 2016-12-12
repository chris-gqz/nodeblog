
$(function(){
	var $loginBox=$('#loginBox');
	var $registerBox=$('#registerBox');
	var $userInfo=$('.userInfo')
	//切换到注册面板
	$loginBox.find('a').on('click',function(){
		$registerBox.show();
		$loginBox.hide();
	})
		//切换到登录面板
		$registerBox.find('a').on('click',function(){
		$registerBox.hide();
		$loginBox.show();
	})
		//注册
	$registerBox.find('button').on('click',function(){
		$.ajax({
		 type:'post',
		 url:'/api/user/register',
		 data:{
		 	username:$registerBox.find('[name="username"]').val(),
		 	password:$registerBox.find('[name="password"]').val(),
		 	repassword:$registerBox.find('[name="repassword"]').val()
		 },
		 dataType:'json',//后端返回数据类型
		 success:function(result){//后端返回数据
		 	//console.log(result);
			 $registerBox.find('.colWarning').html(result.message);
			 //result.code==0代表成功
			 if(!result.code){
				 //注册成功
				 setTimeout(function(){
					 $loginBox.show();
					 $registerBox.hide();
				 },1000);
			 }
		 }
		});

	});
	$loginBox.find('button').on('click',function(){
		$.ajax({
			type:'post',
			url:'/api/user/login',
			data:{
				username:$loginBox.find('[name="username"]').val(),
				password:$loginBox.find('[name="password"]').val()
			},
			dataType:'json',
			success:function(result){

				$loginBox.find('.colWarning').html(result.message);

               if(!result.code){
				   window.location.reload();
			   }
			}
		})
	})
	//退出
	$('#logoutBtn').on('click',function(){
		$.ajax({
			url:'/api/user/logout',
			success:function(result){
				if(!result.code){
					window.location.reload();
				}
			}
		})
	})
})