/**
 * Texas Instruments jQuery ui Widgets 1.0.0

 * Depends:
 *  jquery-2.7.2
 *	jquery.ui-1.10.2.custom.min.js [custom build of jquery ui containing - jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js]
 *  jquery.mobile.custom.min.js [custom of build of jquery mobile 1.3.1 containing touch events]
 */


(function( $, undefined ) {

$.widget('ti.slideshow',{
	options: {
		debug:false,   		//If true will display debug messages is the html structure of the slideshow is incorrect
		controls:true, 		//Display controls
		animate:'slide',    //Default Animation is slide left
		autoplay:true, 		//Start slideshow automatically
		pause:true,			//Pause when hovering over .tislides
		start:1,			//Slides are number 1-n.  Start the slideshow on the nth slide.
		speed:4000,         //Time delay between transitions
		duration:500,      //Duration of transition effect
		overlay:true,		//If true will display the next and previous overlay btns
		overlaywidth:80		//Previous and Next activation width
	},
	
	_create:function() {
		var _self = this;		
		this._timer = null;
		this._container = this.element.find('div.tislides');
		this._slidelist	= this._container.find('ul');		
		this._slides 	= this._container.find('li');
		this._index		= this.options.start-1;
		this._controls	= [];
		if (this.options.debug && !this._validate()) return;	
		this._preload();
	},
	
	_preload:function() {		
		var imgs 	= this._slides.find('img'),
			count 	= imgs.length,
			counter = 0,
			_self	= this;
		imgs.one('load',function(){
			counter++;
			if (counter == count) _self._createinterface();
		}).each(function(){
			var thisImg = this;
			if (this.complete) $(this).load();
			else setTimeout(function(){
				$(thisImg).load();
			},1000);
		});
	},
	
	_destroy:function() {
		this.element.removeClass('ti-ui-slideshow');
		this._slidelist.find('img').removeAttr('style');
		this._slidelist.find('li a').removeAttr('style');
		this._slidelist.removeAttr('style');
		this._slides.removeAttr('style');
		this._container.removeAttr('style');
		
		this._container.off();
		this._slidelist.off();
		if (this._prev) this._prev.remove();
		if (this._next) this._next.remove();
		
		this._controls.empty().remove();
	},
	
	_validate:function() {
		var _valid = true;
		if (this._container.length <= 0) {alert('TI:Slideshow: no slide wrapper div. Please add a div around the slide list element with class tislides');return false;}
		if (this._slidelist.length <= 0) {alert('TI:Slideshow: no list item.  Please add a ul element that containes all the slide elements');return false;}
		if (this._slides.length <= 0) 	{alert('TI:Slideshow: no slide li items.  All slides need to be added as a li element');return false;}
		if (this.options.start < 1 || this.options.start > this._slides.length ) {alert('TI:Slideshow: start slide number is not valid');return false;}
		this._slides.each(function(i){if ($(this).find('img').length <= 0) {alert('TI:Slideshow: slide no '+(i+1)+' has no image');_valid = false;return false;}});
		return _valid;
	},
	
	_createinterface:function() {
		var _self = this;
		
		this.element.addClass('ti-ui-slideshow');	
		
		//Set up the required css rules
		this.width = this._slides.width();
		this._slidelist.css({position:'relative','list-style':'none',padding:0,margin:0,border:0}).width(this._slides.width()).height(this._slides.height());
		this._container.css({overflow:'hidden',padding:0,margin:0}).width(this._slides.width()).height(this._slides.height());
		this._container.parent().removeClass('noscript').css('visibility','visible');
		this._slides.css({'list-style':'none',margin:0,padding:0,border:0,position:'absolute',left:0,top:0,width:'100%',height:'100%'}).each(function(i){
			$(this).find('a').css({display:'block',margin:0,padding:0,border:0});
			$(this).find('img').css({margin:0,padding:0,border:0,display:'block'});
		});
		
		
		if (this.options.pause) {
			this._container.on({
				mouseenter:function(event) {event.preventDefault();_self.stop();},
				mouseleave:function(event) {event.preventDefault();if (_self.options.autoplay) _self.start();}
			});
		}
		
		
		//If cross fade then position the slides one on top of each other
		if (this.options.animate.toLowerCase() == 'crossfade') {
			this._slides.fadeOut(0);
			this._slides.eq(this._index).fadeIn(0);			
		} else {
			this._slides.css({visibility:'hidden'});
			this._slides.eq(this._index).css({visibility:'visible'});
		}
		
		
		//Add the controls 
		if (this.options.controls) {
			var controllist = $('<div class="tisscontrols"><ul></ul></div>').insertAfter(this._container);
			for(i=0;i<this._slides.length;i++) this._controls[i] = controllist.find('ul').append($('<li title="'+(i+1)+'">'+(i+1)+'</li>').data('index',i).click(function(){
				_self._showslide($(this).data('index'),($(this).data('index') > _self._index || $(this).data('index') == 0 && _self._index == _self._slides.length-1) && !($(this).data('index') == _self._slides.length-1 && _self._index == 0));
			}));
			this._controls = controllist.find('li');
			$(this._controls[this._index]).addClass('selected');
		}
				
		//Add the overlay 
		if (this.options.overlay) {
			this._container.css('position','relative');	
			this._prev = $('<a href="prev" title="Previous" class="tissprev">Prev</a>').insertAfter(this._slidelist).css({position:'absolute',top:0,bottom:0,left:0,width:this.options.overlaywidth}).on({
				mouseenter:function(){$(this).stop(true,true).fadeTo(250,1);},
				mouseleave:function() {$(this).stop(true,true).fadeTo(250,.01);},
				click:function(event){event.preventDefault();_self.stop();_self._decrement();}
			}).fadeTo(0,.01);
		
			this._next = $('<a href="next" title="Next" class="tissnext">Next</a>').insertAfter(this._slidelist).css({position:'absolute',top:0,bottom:0,right:0,width:this.options.overlaywidth}).on({
				mouseenter:function(){$(this).stop(true,true).fadeTo(250,1);},
				mouseleave:function() {$(this).stop(true,true).fadeTo(250,.01);},
				click:function(event){event.preventDefault();_self.stop();_self._increment();}
			}).fadeTo(0,.01);
		}
		
		//Start the slideshow
		if (this.options.autoplay) _self.start();						
	},
		
	start:function() {
		var _self = this;
		if (this.options.autoplay) {
			if (this.timer != null) this.stop();
			this.timer = setTimeout(function(){_self._increment();},this.options.speed);
		}
	},
	
	stop:function() {
		clearInterval(this.timer);
		this.timer = null;
		this._slides.stop(true,true);
	},
	
	_increment:function() {this._showslide((this._index+1)%this._slides.length,true);},
	
	_decrement:function() {this._showslide((this._index+this._slides.length-1)%this._slides.length,false);},
	
	_showslide:function(index,inc) {
		if (this._index == index) return;
		this.stop();
		this.options.animate.toLowerCase() == 'crossfade' ? this._showslidecross(index) : this._showslideslide(index,inc);
		$(this._controls[this._index]).removeClass('selected');
		this._index = index;
		$(this._controls[this._index]).addClass('selected');		
	},
	
	_showslidecross:function(index) {
		var _self = this;
		if (this._index != null) $(this._slides[this._index]).fadeOut(this.options.duration);
		$(this._slides[index]).fadeIn(this.options.duration,function(){_self.start();});
	},
	
	_showslideslide:function(index,inc) {	
		var _self = this;
		if (inc) {
			$(this._slides[index]).stop().css({left:this.width,visibility:'visible'}).animate({'left':0},this.options.duration);
			$(this._slides[this._index]).stop().animate({'left':-this.width},this.options.duration,function(){_self.start();});
		} else {
			$(this._slides[index]).stop().css({left:-this.width,visibility:'visible'}).animate({'left':0},this.options.duration);
			$(this._slides[this._index]).stop().animate({left:this.width},this.options.duration,function(){_self.start();});
		}
	}
});

})( jQuery );