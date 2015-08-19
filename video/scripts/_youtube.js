//-------------------------------------
//-- Youtube [Video]
//-------------------------------------

(function(){
	'use strict';

	var
		local = {},
		module = {}
	;

	//- Functions [Public] ------------------------------------------------------//
	
	app.video.youtube = {};
	app.video.youtube.initPlayer = function(options){
		_initPlayer(options);
	};

	//- Cache -------------------------------------------------------------------//

	local.cache = function() {
		module.players = [];
		module.defaultVars = {
			'autohide' : undefined,
			'autoplay' : undefined,
			'cc_load_policy' : undefined,
			'color' : undefined,
			'controls' : undefined,
			'disablekb' : undefined,
			'end' : undefined,
			'fs' : undefined,
			'hl' : undefined,
			'iv_load_policy' : undefined,
			'list' : undefined,
			'listType' : undefined,
			'loop' : undefined,
			'modestbranding' : undefined,
			'origin' : undefined,
			'playlist' : undefined,
			'playsinline' : undefined,
			'rel' : undefined,
			'showinfo' : undefined,
			'start' : undefined,
			'theme' : undefined
		};
		module.defaultOptions = {
			'selector' : __.component('youtube-player'),
			'videoId' : undefined,
			'mute' : undefined,
			'cover' : undefined,
			'playerVars' : module.defaultVars,
			'onReady' : undefined,
			'onStateChange' : undefined
		};
	};

	//- Start ------------------------------------------------------------------//

	local.start = function() {
		// Init all players with the default values
		_initPlayer();
	};

	//- Functions [Private] ----------------------------------------------------//

	var _loadQueue = [];
	var _APILoaded = false;
	var _APIReady = false;
	var _loadAPI = function(callback){
		var _callback = !!callback ? callback : function(){};
		if(!_APILoaded) {
			// Set callback
			global.onYouTubePlayerAPIReady = function(){
				// Set ready flag
				_APIReady = true;
				// Initialize queued players
				$.each(_loadQueue, function(i,o){
					_initPlayer(o);
				});
				// Send array of players initialized on load to the callback
				_callback(module.players);
			};
			// Load the IFrame Player API code asynchronously
			var tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/player_api';
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			// Set load flag
			_APILoaded = true;
		}
	};

	var _idCounter = 1;
	var _initPlayer = function(options) {
		var _o = $.extend(true, {}, module.defaultOptions, options);
		if(_APIReady){
			var _players = [];
			$(_o.selector).each(function(){
				var _p = {};
				_p.$self = $(this);
				// Merge options if we are updating an existing player
				var _isUpdate = false;
				$.each(module.players, function(i,p){
					if(p.$self.is(_p.$self)){
						_isUpdate = true;
						$.extend(true, p.options, _o);
						_p = p;
						return false;
					}
				});
				if(!_isUpdate){
					_p.options = $.extend({}, _o);
					// Set a unique player id
					var _id = _p.$self.attr('id');
					if(!!_id){
						_p.id = _id;
					}else{
						_p.id = 'youtube-player-' + _idCounter;
						_p.$self.attr('id', _p.id);
						_idCounter++;
					}
				}
				// Override options with data attributes
				$.each(module.defaultOptions, function(option){
					var _data = _p.$self.data(option);
					if(_data !== undefined){
						_p.options[option] = _data;
					}
				});
				// Override vars with data attributes
				$.each(module.defaultVars, function(setting){
					var _data = _p.$self.data(setting);
					if(_data !== undefined){
						_p.options.playerVars[setting] = _data;
					}
				});
				// Set a placeholder for updating
				if(_isUpdate){
					var $ph = $('<div id="' + _p.id + '"></div>');
					_p.$self.replaceWith($ph);
					_p.$self = $ph;
					_p.self.destroy();
				}
				// Init player
				_p.self = new global.YT.Player(_p.id, {
					playerVars: _p.options.playerVars,
					videoId: _p.options.videoId,
					events: {
						onReady: function(e){
							if(!!_p.options.mute){
								e.target.mute();
							}
							if(!!_p.options.onReady){
								_p.options.onReady(e);
							}
						}
					}
				});
				if(!!_p.options.cover){
					_p.$self.parent().css('background-image', 'url(http://i.ytimg.com/vi/'+ _p.options.videoId +'/maxresdefault.jpg)');
					app.dom.document.trigger('Cover:Reflow');
				}
				if(!!_p.options.onStateChange){
					_p.self.addEventListener('onStateChange', function(e){
						_p.options.onStateChange(e);
					});
				}
				_p.$self = $(_p.self.f);
				_players.push(_p);
				if(!_isUpdate){
					module.players.push(_p);
				}
			});
			return _players.length > 1 ? _players : _players[0];
		}else{
			_loadQueue.push(_o);
			if(!_APILoaded){
				_loadAPI();
			}
		}
	};

	//- Ready ------------------------------------------------------------------//

	$(function() {
		local.cache();
		local.start();
	});

})();
