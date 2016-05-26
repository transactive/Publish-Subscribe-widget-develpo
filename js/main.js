require.config(
{
   paths:{
	jquery:'jquery-1.12.1',
	jqueryUI:'jqueryUI-1.11.4'
   }
});
require(['jquery','Window'],function($,w){
	$('#input1').click(function(){
		var win=new w.Window();
		win.alert({
			content:'hello world',
			width:300,
			height:150,
			handler4AlertBtn:function(){
				alert('you click the alert button');
			},
			handler4CloseBtn:function()
			{
				alert('you click the close button');
			},
			title:'提示',
			hasCloseBtn:true,
			text4AlertBtn:'OK',
			dragHandle:".window_header"
		});
		win.on('alert',function(){
			alert('alert the second alert button');
		});
		win.on('close',function(){
			alert('alert the second close button');
		});
	});
	$('#input2').click(function(){
		var win=new w.Window();
		win.confirm({
			content:'你确定要删除这个文件吗？',
			width:300,
			height:150,
			title:'系统消息',
			text4ConfirmBtn:'是',
			text4CancelBtn:'否',
			dragHandle:".window_header"
		}).on('confirm',function(){
			alert('确定');
		}).on('cancel',function(){
			alert('取消');
		});
	});
	$("#input3").click(function(){
		var win=new w.Window();
		win.prompt({
			title : '请输入您的姓名',
			content: '我们将会为您保密',
			width: 300,
			height : 150,
			y: 50,
			hasCloseBtn : true,
			text4PromptBtn : '输入',
			defaultValue4Prompt : '张三',
			dragHandle: '.window_header',
			handler4PromptBtn:function(inputValue){
				alert("您输入的内容是："+inputValue);
			},
			handler4CancelBtn:function(){
				alert("取消!");
			}
		});
	});
		$("#input4").click(function(){
		var win=new w.Window();
		win.common({
			content: '我是一个普通弹窗',
			width: 300,
			height : 150,
			y: 50,
			hasCloseBtn : true
		});
	});
});