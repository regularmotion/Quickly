function Quickly(el, callback) {
	this.callback = callback;
	this.clicked = (typeof el === 'object')? el : document.getElementById(el);
	
	this.subscribe(Quickly.EVT_START, this.clicked);
	
	if ( !Quickly.isTouch ) {
		this.hovered = this.clicked;
		this.subscribe(Quickly.EVT_HOVER, this.hovered);
	}
}

Quickly.isTouch = ('ontouchstart' in window)? true : false;
Quickly.EVT_START = Quickly.isTouch? 'touchstart' : 'mousedown';
Quickly.EVT_END   = Quickly.isTouch? 'touchend' : 'mouseup';
Quickly.EVT_HOVER = Quickly.isTouch? null : 'mouseover';
Quickly.EVT_LEAVE = Quickly.isTouch? null : 'mouseout';

Quickly.prototype = {
	handleEvent: function(e) {
		switch (e.type) {
			case Quickly.EVT_START: this.onTouchStart(e); break;
			case Quickly.EVT_END  : this.onTouchEnd(e); break;
			case Quickly.EVT_HOVER: this.onHovered(e); break;
			case Quickly.EVT_LEAVE: this.onLeaved(e); break;
		}
		e.stopPropagation();
		e.preventDefault();
	},
	
	onTouchStart: function(e) {
		this.clicked.addClass('clicked');
		this.subscribe(Quickly.EVT_END);
	},
	
	onTouchEnd: function(e) {
		this.unsubscribe(Quickly.EVT_END);
		
		if ( this.clicked ) this.clicked.removeClass('clicked');
		if ( typeof this.callback === 'function' ) this.callback(e);
	},
	
	onHovered: function(e) {
		this.clicked.addClass('hovered');
		this.subscribe(Quickly.EVT_LEAVE, this.hovered);
	},
	
	onLeaved: function(e) {
		this.unsubscribe(Quickly.EVT_LEAVE, this.hovered);
		if ( this.hovered ) this.hovered.removeClass('hovered');
	},
	
	subscribe: function(event, el) {
		var element = el || document.documentElement;
		element.addEventListener(event, this, false);
	},
	
	unsubscribe: function(event, el) {
		var element = el || document.documentElement;
		element.removeEventListener(event, this, false);
	}
};