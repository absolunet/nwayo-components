//-------------------------------------
//-- Base [Video]
//-------------------------------------

(function(){
	'use strict';

	var
		local = {}
	;

	//- Functions [Public] ------------------------------------------------------//
	app.video = {};
	app.video.wrapFlexVideo = function(selector){
		_wrapFlexVideo(selector);
	};

	//- Start ------------------------------------------------------------------//

	local.start = function() {
		//_wrapFlexVideo();
	};

	//- Functions [Private] ----------------------------------------------------//

	// Wrap flex videos [Foundation]
	var _wrapFlexVideo = function(selector){
		var _el = !!selector ? selector : 'iframe[src*="www.youtube.com"]:not(.no-flex), iframe[src*="player.vimeo.com"]:not(.no-flex), iframe[src*="s.vid.ly"]:not(.no-flex)';
		$(_el).each(function() {
			var $this = $(this);
			var $parent = $this.parent();
			if ($parent.is('p')) {
				$this.unwrap();
			}
			if (!$parent.hasClass('flex-video')) {
				$this.wrap('<div class="flex-video widescreen"></div>');
			}
		});
	};

	//- Ready ------------------------------------------------------------------//

	$(function() {
		local.start();
	});

})();
