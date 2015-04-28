//-------------------------------------
//-- Addthis
//-------------------------------------

//= **require     bower_components/foo/bar
//= **require     components/common/scripts/foobar
//= **jshtml      components/common/templates/foobar
//= **jshtml_tree components/common/templates

(function(){
	'use strict';

	var local = {};


	//-- Cache data
	local.cache = function() {

		//

	};


	//-- Bind events
	local.bind = function() {

		//

	};


	//-- To execute on start
	local.start = function() {

		// addthis
		/**
		global.addthis_config = { ui_language: app.env.lang };
		global.addthis.init();

		or

		$(__.component('share')+' '+__.action('open')).on('click', function() {
			var $share = $(this).closest(__.component('share'));
			if (!$share.hasClass('open')) {
				$share.addClass('open').append( app.tmpl.commonShare.render() );
				global['addthis_config'] = { 'ui_language': app.env.lang };
				insertScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-54d8e1a80dc7b7c2');
			}
		});
		/**/

	};


	$(function() {
		local.cache();
		local.bind();
		local.start();
	});

})();
