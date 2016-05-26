define(['Widget','jquery','jqueryUI'],function(Widget,$,$UI){
	function Window(){
		this.cfg={
			width:500,
			height:300,
			content:'',
			title:"系统消息",
			handler:null,
			hasCloseBtn:false,			
			text4AlertBtn:'确定',
			text4ConfirmBtn:"确定",
			text4CancelBtn:"取消",
			handler4AlertBtn:null,
			handler4CloseBtn:null,
			handler4ConfirmBtn:null,
			handler4CancelBtn:null,
			hasMask:true,
			isDraggable:true,
			dragHandle:null,
			text4PromptBtn  : '确定',
			defaultValue4Prompt:'',
			isPromptInputPassword : false,
			maxlength4Prompt :10,
            handler4PromptBtn  : null
		}
	}
	Window.prototype=$.extend({},new Widget.Widget(),{

		rendUI:function(){
			var footerContent = '';
			switch(this.cfg.winType){
				case "alert":
					footerContent = '<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn" />';
				break;
				case "confirm":
					var confirm_footer_html = '';
					confirm_footer_html += '<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn" />';
					confirm_footer_html += '<input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn" />'
					footerContent = confirm_footer_html;
				break;
				case "prompt":
					this.cfg.content += '<p class="window_promptInputWrapper">';
						this.cfg.content += '<input type="'+(this.cfg.isPromptInputPassword ? "password" : "text")+'" value="'+this.cfg.defaultValue4Prompt+'" '
											+ 'maxlength="'+this.maxlength4Prompt+'" class="window_promptInput"'
											+ ' />'
					this.cfg.content += '</p>';
					
					var prompt_footer_html = '';
					prompt_footer_html += '<input type="button" value="'+this.cfg.text4PromptBtn+'" class="window_promptBtn" />';
					prompt_footer_html += '<input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn" />'
					footerContent = prompt_footer_html;
				break;
			};
			var backgroundBox_html = '';
				backgroundBox_html += '<div class="window_backgroundBox">';
				backgroundBox_html += '<div class="window_body">'+this.cfg.content+'</div>';		
				backgroundBox_html += '</div>';	
			this.backgroundBox = $(backgroundBox_html);
			
			if(this.cfg.winType != 'common'){
				this.backgroundBox.prepend('<div class="window_header">'+this.cfg.title+'</div>');
				this.backgroundBox.append('<div class="window_footer">'+footerContent+'</div>');
			}
			
			if(this.cfg.hasMask){
				this.mask=$('<div class="window_mask"></div>');
				this.mask.appendTo('body');
			}
			if(this.cfg.hasCloseBtn)
			{
				this.backgroundBox.append('<span class="window_closeBtn">X</span>');
			}
			this.backgroundBox.appendTo('body');
			this._promptInput = this.backgroundBox.find(".window_promptInput");
		},
		bindUI:function(){
		   var that=this;
           this.backgroundBox.delegate('.window_alertBtn','click',function(){
           	    that.fire('alert');
				that.destroy();
			}).delegate('.window_closeBtn','click',function(){
				that.fire('close');
				that.destroy();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire("cancel");
				that.destroy();
			}).delegate(".window_promptBtn","click",function(){
				that.fire("prompt",that._promptInput.val());
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on('alert',this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on('close',this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4PromptBtn){
				this.on("prompt",this.cfg.handler4PromptBtn);
			}
			if(this.cfg.handler4CancelBtn){
				this.on("cancel",this.cfg.handler4CancelBtn);
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on("close",this.cfg.handler4Confirm);
			}
		},

		syncUI:function(){
			this.backgroundBox.css({
				width:this.cfg.width+'px',
				height:this.cfg.height+'px',
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+'px',
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+'px'
			});
			
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle)
				{
					this.backgroundBox.draggable({handle:this.cfg.dragHandle});
				}
				else{
					this.backgroundBox.draggable();
				}				
			}
		},
		destructor:function(){
			this.mask&&this.mask.remove();
		},
		alert:function(cfg){			
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;	
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt : function(cfg){
			$.extend(this.cfg,cfg,{winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common : function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			return this;
		}
	});
	return {
		Window:Window
	}
});
