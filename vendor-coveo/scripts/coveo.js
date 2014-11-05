// @import 'js/vendor/coveo/CoveoJsSearch.Dependencies'
// @import 'js/vendor/coveo/CoveoJsSearch'
// **@import 'js/vendor/coveo/globalize'
// **@import 'js/vendor/coveo/l10n'
// **@import 'js/vendor/coveo/fr'
// **@import 'js/vendor/coveo/en'

(function() {

    var Local               = {},
        $searchBox          = $('#searchBox'),
        $searchInterface    = $('#searchInterface'),

        endpointURI         = $searchBox.data('coveo-endpoint'),
        collection          = $searchInterface.data('coveo-collection'),
        source              = $searchInterface.data('coveo-source'),
        searchRoute         = $searchBox.data('coveo-searchroute');


    Local.config = function() {

        Coveo.Rest.SearchEndpoint.endpoints["default"] = new Coveo.Rest.SearchEndpoint({
            restUri: endpointURI
        });

        // Settings for multilingual interface
        // Do import in top of file
        String.locale = App.env.lang;
        Globalize.culture(App.env.lang);

    };

    Local.start = function() {

        if(!App.Utils.isOnSearchPage()) {
            $searchBox
                .coveo('initSearchBox', searchRoute);
        }

        $searchInterface
            .coveo('init', {
                SearchInterface : {
                    enableHistory       : true,
                    hideUntilFirstQuery : false,
                    hiddenExpression:
                        '(@syscollection==' + collection + ')' +
                        '(@syssource==' + source + ')',
                    excerptLength       : 300
                },
                ResultList: {
                    resultTemplate: new Coveo.Ui.JsRenderTemplate(App.tmpl.coveo_result)
                },
                externalComponents      : [$searchBox]
            })
            .on('preprocessResults', function(e, data) {
                // DO something
            });

    };

    $(function() {
        Local.config();
        Local.start();
    });

})();