/**
 *  Lite Version of Quickly v 0.4.
 */
function Quickly(el, callback) {
	this.callback = callback;
	this.clicked = (typeof el === 'object')? el : document.getElementById(el);
	this.clicked.addEventListener(Quickly.EVT_START, this, false);
}

Quickly.isTouch = ('ontouchstart' in window)? true : false;
Quickly.EVT_START = Quickly.isTouch? 'touchstart' : 'mousedown';
Quickly.EVT_END = Quickly.isTouch? 'touchend' : 'mouseup';

Quickly.prototype = {
	handleEvent: function(e) {
		switch (e.type) {
			case Quickly.EVT_START: this.onTouchStart(e); break;
			case Quickly.EVT_END: this.onTouchEnd(e); break;
		}
		e.stopPropagation();
		e.preventDefault();
	},
	
	onTouchStart: function(e) {
		this.clicked.addClass('clicked');
		document.documentElement.addEventListener(Quickly.EVT_END, this, false);
	},
	
	onTouchEnd: function(e) {
		document.documentElement.removeEventListener(Quickly.EVT_END, this, false);
		
		if ( this.clicked ) this.clicked.removeClass('clicked');
		if ( typeof this.callback === 'function' ) this.callback(e);
	}
};