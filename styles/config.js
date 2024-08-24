/* ------------------------------------------------------------------- */
/* Sheet ID
/* Your sheet ID
/* ------------------------------------------------------------------- */
let sheetID = "1IC6ZakwjckFDWrmkcBqBiHBDSE8ggEgW8WL7XQZoFg4";


/* ------------------------------------------------------------------- */
/* All sheet pages
/* ------------------------------------------------------------------- */
let sheetPages = {

    masterlist: "masterlist",

}


/* ------------------------------------------------------------------- */
/* All Site Options
/* ------------------------------------------------------------------- */
let options = {


   


    /* Masterlist
    /* --------------------------------------------------------------- */
    masterlist: {

        sheetPage: sheetPages.masterlist,
        logSheetPage: sheetPages.masterlistLog,

        itemAmount: 12,
        itemOrder: "asc",

        filterColumn: 'Design Type',
        searchFilterParams: ['ID', 'Owner', 'Designer', 'Artist'],
        fauxFolderColumn: 'MYO Type',

    /* --------------------------------------------------------------- */
 
