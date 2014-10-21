<!doctype html>
<html>

    <head>
        <title>Coveo - Page de résultats de recherche</title>
    </head>

    <body>
        <header>
            <!-- Coveo search box (include in header) -->
            <div class="search-nav">
                <div class="coveo-search-section search" id="searchBox"
                     data-coveo-endpoint="MY-REST-URI/--mydomain--"
                     data-coveo-searchroute="MY-ROUTE">
                    <div class="coveo-search-section-wrapper">
                        <div class="CoveoSearchBox" data-auto-focus="false"></div>
                    </div>
                </div>
            </div>
        </header>
        <main role="main">
            <div id="searchInterface" class="CoveoSearchInterface"
                 data-enable-history="true"
                 data-coveo-collection="MY-COLLECTION"
                 data-coveo-source="MY-SOURCE">
                <section class="main-section">
                    <div class="coveo-results-section">
                        <div class="coveo-results-column">
                            <div class="coveo-results-header">
                                <div class="coveo-summary-section">
                                    <div class="CoveoQuerySummary"></div>
                                </div>
                                <div class='coveo-clear'></div>
                            </div>

                            <div class="CoveoHiddenQuery"></div>
                            <div class="CoveoDidYouMean"></div>
                            <div class="CoveoErrorReport" data-pop-up='true'></div>

                            <div class="CoveoResultList" data-wait-animation="fade"></div>

                            <div class="CoveoPager"></div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </body>
</html>