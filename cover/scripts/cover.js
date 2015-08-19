//-------------------------------------
//-- Cover
//-------------------------------------

(function(){
	'use strict';

	var
		$ = !!$ ? $ : nwayo.vendor.jQuery,
		app = !!app ? app : global[nwayo.projectname],
		local = {},
		module = {}
	;

	//- Functions [Public] ------------------------------------------------------//

	app.cover = {};
	app.cover.init = function(context) {
		var $covers = _getCover(context);
		if($covers.length > 0){
			_initCover($covers);
		}
	};
	app.cover.update = function(context) {
		var $covers = _getCover(context);
		if($covers.length > 0){
			_updateCover($covers);
		}
	};

	//- Cache -------------------------------------------------------------------//

	local.cache = function() {

		module.cssClass = 'cover-media';
		module.activeClass = 'cover-active';
		module.selector = '.' + module.cssClass;
		module.configData = 'cover-config';
		module.covers = [];

	};

	//- Listen -----------------------------------------------------------------//

	local.listen = function() {

		app.dom.document
			.on('App:Reflow Cover:Reflow', function(){
				_reflow();
			})
			.on('Cover:Update', function(){
				_updateCover();
			});

	};

	//- Start ------------------------------------------------------------------//

	local.start = function() {
		_initCover();
		app.dom.window.on('resize', function(){
			_updateCover();
		});
	};

	//- Functions [Private] ----------------------------------------------------//

	// Set the media ratio size on load
	var _setInitialSizes = function(c){
		if(c.initialWidth + c.initialHeight === 0){
			c.initialWidth = c.isImage ? c.$media.get(0).naturalWidth : c.isVideo ? c.$media.get(0).videoWidth : c.$media.width();
			c.initialHeight = c.isImage ? c.$media.get(0).naturalHeight : c.isVideo ? c.$media.get(0).videoHeight : c.$media.height();
		}
		return c;
	};

	// Initialize covers
	var _initCover = function(cover){
		var $covers = $(!!cover ? cover : module.selector);
		$covers.each(function(){
			var	c = {};
			c.$self = $(this);
			c.$media = c.$self.find('img, video, iframe').first();
			c.isImage = c.$media.filter('img').length > 0;
			c.isVideo = c.$media.filter('video').length > 0;
			c.initialWidth = 0;
			c.initialHeight = 0;
			c.lastCoverWidth = 0;
			c.lastCoverHeight = 0;
			c.lastRatio = 0;
			c.ready = true;

			if(c.$media.length > 0){
				c = _setInitialSizes(c);
				if(c.isImage){
					if(c.$media.get(0).complete && c.initialWidth + c.initialHeight > 0){
						_doUpdate(c);
					}
					c.$media.on('load', function(){
						c = _setInitialSizes(c);
						_doUpdate(c);
					});
				}else if(c.isVideo){
					if(c.$media.get(0).readyState > 1){
						c = _setInitialSizes(c);
						_doUpdate(c);
					}else{
						c.$media.on('loadedmetadata', function(){
							c = _setInitialSizes(c);
							_doUpdate(c);
						});
					}
				}else{
					_doUpdate(c);
				}

				c.$self.data(module.configData, c);
				module.covers.push(this);
			}
		});
	};

	// Parse elements to execute an update
	var _updateCover = function(cover){
		$(!!cover ? cover : module.selector).each(function(){
			var _config = $(this).data(module.configData);
			_doUpdate(_config !== undefined ? _config : { $self:$(this) });
		});
	};

	// Update covers from config
	var _doUpdate = function(c){
		if(!!c.ready){
			if(c.initialWidth + c.initialHeight > 0){
				var _coverWidth = c.$self.width();
				var _coverHeight = c.$self.height();
				
				if(_coverWidth !== c.lastCoverWidth || _coverHeight !== c.lastCoverHeight){
					c.lastCoverWidth = _coverWidth;
					c.lastCoverHeight = _coverHeight;
					var _widthRatio = _coverWidth/c.initialWidth;
					var _heightRatio = _coverHeight/c.initialHeight;
					var _ratio = _widthRatio >= _heightRatio ? _widthRatio : _heightRatio;
					if(c.lastRatio !== _ratio){
						c.lastRatio = _ratio;
						c.$media.width(_ratio * c.initialWidth);
						if(!c.isImage && !c.isVideo) {
							c.$media.height(_ratio * c.initialHeight);
						}
						c.$self.addClass(module.activeClass);
					}
				}

				c.$self.data(module.configData, c);
			}
		}else{
			_initCover(c.$self);
		}
	};

	// Get covers inside a defined context
	var _getCover = function(context){
		var $context = !!context ? $(context) : app.dom.document;
		var $covers = $context.find(module.selector);
		if($context.hasClass(module.cssClass)){ $covers.add($context); }
		return $covers;
	};

	// Init new covers and active covers with new media
	var _reflow = function(){
		_clearCovers();
		var $covers = $(module.selector);
		var $newCovers = $.grep($covers, function(el) { return $.inArray(el, module.covers) === -1; });
		if($newCovers.length > 0){ _initCover($newCovers); }
	};

	// Remove inactive covers from the collection
	var _clearCovers = function(){
		$.each(module.covers, function(i,cover){
			var $cover = $(cover);
			var _config = $cover.data(module.configData);
			if(_config === undefined || !$.contains(document.documentElement, _config.$media[0])){
				$cover.removeData(module.configData).removeClass(module.activeClass);
				module.covers.splice(i, 1);
			}
		});
	};

	//- Ready ------------------------------------------------------------------//

	$(function() {
		local.cache();
		local.listen();
		local.start();
	});

})();
