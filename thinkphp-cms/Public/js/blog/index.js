
$(document).ready(function(){

	$(".oname").bind({

		mousemove:function(){$(this).css('color','white')},
		mouseout:function(){$(this).css('color','#C5C5C5')},
		click:function(){window.location.href='#'}

	});

	$(".bar1 p,.bar2 p,.bar3 p").bind({

		mousemove:function(){$(this).css('color','white')},
		mouseout:function(){$(this).css('color','#C5C5C5')}

	});

	$(".about p").bind({

		mousemove:function(){$(this).css('color','white')},
		mouseout:function(){$(this).css('color','#C5C5C5')}

	});

	$(".contact img").bind({

		mousemove:function(){$(this).css({'width':'60px','height':'60px'})},
		mouseout:function(){$(this).css({'width':'50px','height':'50px'})}

	});

	$(".contact img:eq(1)").click(function(){

		if($(this).hasClass("active")){

			offset=$(".aside-left").outerWidth(true);

			$(".contact-weixin").animate({

				left:'-='+offset+'px'

			});

			$(this).removeClass("active");

		}else{
			
			offset=$(".aside-left").outerWidth(true);

			$(".contact-weixin").animate({

				left:'+='+offset+'px'

			});

			$(this).addClass("active");
		}

	});

	$(".bar2 p").click(function(){

			if($(this).hasClass("active")){

				offset=$(".aside-left").outerWidth(true);

				$(".classify").animate({

					left:'-='+offset+'px'

				});

				$(this).removeClass("active");

			}else{
				
				offset=$(".aside-left").outerWidth(true);

				$(".classify").animate({

					left:'+='+offset+'px'

				});

				$(this).addClass("active");
			}

	});

	$(".bar3 p").click(function(){

			if($(this).hasClass("active")){

				$(".search input").animate({width:'10px'},function(){

					$(".search form").css("display","none");

				});	
			
				$(this).removeClass("active");

			}else{
				
				$(".search form").css("display","block");
				$(".search input").animate({

					width:'150px'
				});	

				$(this).addClass("active");

			}

	});

});