//-------------------------------------
//-- Google Tag Manager
//-------------------------------------

//= require bower_components/kafe/dist/ext/googletagmanager

(function(){
	'use strict';

	var local = {};


	//-- Cache data
	local.cache = function() {

		//

	};


	//-- Bind events
	local.bind = function() {

		/*
		app.dom.body.on('click', __.action('trigger-gtm-event'), function() {
			var $this = $(this);
			kafe.ext.googletagmanager.triggerEvent($this.data('gtm-event'), $this.data('gtm-options'));
		});
		*/

	};


	//-- To execute on start
	local.start = function() {

		//

	};


	$(function() {
		local.cache();
		local.bind();
		local.start();
	});

})();
