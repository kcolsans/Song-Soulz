/* ==================================================================== */
/* Load Header and Footer
======================================================================= */
$(function () {
    $(".load-html").each(function () {$(this).load(this.dataset.source)});
});


/* ==================================================================== */
/* ==================================================================== */
/* Charadex w/ Gallery and Cards
======================================================================= */
const charadexLarge = async (options) => {

    // Sort through options
    const charadexInfo = optionSorter(options);

    // Grab the sheet
    let sheetArray = await fetchSheet(charadexInfo.sheetPage);

    // Grab all our url info
    let cardKey = Object.keys(sheetArray[0])[0];
    let preParam = urlParamFix(cardKey, charadexInfo.fauxFolderColumn);

    // Create faux folders
    // Filter through array based on folders
    if (charadexInfo.fauxFolderColumn) sheetArray = fauxFolderButtons(sheetArray, charadexInfo.fauxFolderColumn);

    // Reverse based on preference
    charadexInfo.itemOrder == 'asc' ? sheetArray.reverse() : '';

    // Add card links to the remaining array
    for (var i in sheetArray) { sheetArray[i].cardlink = baseURL + preParam + sheetArray[i][cardKey]; }

    // Decide if the url points to profile or entire gallery
    if (urlParams.has(cardKey)) {

        // Render the prev/next links on profiles
        prevNextLinks(sheetArray, baseURL, preParam, urlParams, cardKey);

        // List.js options
        let itemOptions = {
            valueNames: sheetArrayKeys(sheetArray),
            item: 'charadex-card',
        };

        // Filter out the right card
        let singleCard = sheetArray.filter((i) => (i[cardKey] === urlParams.get(cardKey)))[0];

        // Render card
        let charadexItem = new List("charadex-gallery", itemOptions, singleCard);


    } else {


        // Create the Gallery

        let galleryOptions = {
            item: 'charadex-entries',
            valueNames: sheetArrayKeys(sheetArray),
            searchColumns: charadexInfo.searchFilterParams,
            page: charadexInfo.itemAmount,
            pagination: [{
                innerWindow: 1,
                left: 1,
                right: 1,
                item: `<li class='page-item'><a class='page page-link'></a></li>`,
                paginationClass: 'pagination-top',
            }],
        };

        // Render Gallery
        let charadex = new List('charadex-gallery', galleryOptions, sheetArray);

        // Make filters workie
        charadexFilterSelect(charadex, sheetArray, charadexInfo.filterColumn);
        charadexSearch(charadex, charadexInfo.searchFilterParams);

        // Show pagination
        showPagination(sheetArray, charadexInfo.itemAmount);

    }

};

/* ==================================================================== */
/* Charadex w/ just Gallery
======================================================================= */
const charadexSmall = async (options) => {

    // Sort through options
    const charadexInfo = optionSorter(options);

    // Grab the sheet
    let sheetArray = await fetchSheet(charadexInfo.sheetPage);

    // Create the Gallery
    let galleryOptions = {
        item: 'charadex-entries',
        valueNames: sheetArrayKeys(sheetArray),
    };

    // Render Gallery
    let charadex = new List('charadex-gallery', galleryOptions, sheetArray);

};


/* ==================================================================== */
/* Masterlist Only
======================================================================= */
const masterlist = async (options) => {

    // Sort through options
    const charadexInfo = optionSorter(options);

    // Grab the sheet
    let sheetArray = await fetchSheet(charadexInfo.sheetPage);

    // Grab all our url info
    let cardKey = Object.keys(sheetArray[0])[3];
    let cardKeyAlt = Object.keys(sheetArray[0])[0];

    let preParam = urlParamFix(cardKey, charadexInfo.fauxFolderColumn);

    // Create faux folders
    // Filter through array based on folders
    if (charadexInfo.fauxFolderColumn) sheetArray = fauxFolderButtons(sheetArray, charadexInfo.fauxFolderColumn);

    // Reverse based on preference
    charadexInfo.itemOrder == 'asc' ? sheetArray.reverse() : '';

    // Add card links to the remaining array
    for (var i in sheetArray) { 
        sheetArray[i].cardlink = baseURL + preParam + sheetArray[i][cardKey]; 
        sheetArray[i].cardlinkalt = baseURL + urlParamFix(cardKeyAlt, charadexInfo.fauxFolderColumn) + sheetArray[i][Object.keys(sheetArray[0])[0]]; 
    }

    // Decide if the url points to profile or entire gallery
    if (urlParams.has(cardKey) || urlParams.has(cardKeyAlt)) {

        // Filter out the right card
        let currCardKey = urlParams.has(cardKey) ? cardKey : cardKeyAlt;
        let singleCard = sheetArray.filter((i) => (i[currCardKey] === urlParams.get(currCardKey)))[0];

        // Grab the log sheet and render log
        let logArray = await fetchSheet(charadexInfo.logSheetPage);
        getLog(logArray, singleCard);

        // List.js options
        let itemOptions = {
            valueNames: sheetArrayKeys(sheetArray),
            item: 'charadex-card',
        };

        // Render the prev/next links on profiles
        prevNextLinks(sheetArray, baseURL, preParam, urlParams, currCardKey, cardKey);

        // Render card
        let charadexItem = new List("charadex-gallery", itemOptions, singleCard);


    } else {

        // Show pagination
        showPagination(sheetArray, charadexInfo.itemAmount);

        // Create the Gallery
        let galleryOptions = {
            item: 'charadex-entries',
            valueNames: sheetArrayKeys(sheetArray),
            searchColumns: charadexInfo.searchFilterParams,
            page: charadexInfo.itemAmount,
            pagination: [{
                innerWindow: 1,
                left: 1,
                right: 1,
                item: `<li class='page-item'><a class='page page-link'></a></li>`,
                paginationClass: 'pagination-top',
            }],
        };

        // Render Gallery
        let charadex = new List('charadex-gallery', galleryOptions, sheetArray);

        // Make filters workie
        charadexFilterSelect(charadex, sheetArray, charadexInfo.filterColumn);
        charadexSearch(charadex, charadexInfo.searchFilterParams);


    }

};


/* ==================================================================== */

/* ==================================================================== */
/* Softload pages
======================================================================= */
$(window).on('pageshow',function(){loadPage()});
