var xlsx = require('xlsx')

module.exports.writeWorkBook = function writeWorkBook(jsonData) {
    //Create new book
    var wb = xlsx.utils.book_new();

    console.log(jsonData);


    buildXliffDataSheet(jsonData.xliff.$);
    xlsx.utils.book_append_sheet(wb, ws, 'xliffData')

    buildFileDataSheet(jsonData.xliff.file[0].$);
    xlsx.utils.book_append_sheet(wb, ws, 'fileData')

    console.log(wb);
    //Write the sheet
    xlsx.writeFile(wb, 'Test.ods') //File name will be ?? and what about local
}

module.exports.readWorkBook = function readWorkBook(filename) {

}

function buildXliffDataSheet(xlifAttributes) {

    var data = [
        ['version', xlifAttributes.version],
        ['xliff', xlifAttributes.xmlns]
    ]

    var ws = xlsx.utils.aoa_to_sheet(data)

    return ws;

}

function buildFileDataSheet(fileAttributes) {

    var data = [
        ['version', fileAttributes.version],
        ['source-language', fileAttributes.sourceLanguage],
        ['datatype', fileAttributes.datatype],
        ['original', fileAttributes.original],
        ['target-language', fileAttributes.targetLanguage]
    ]

    var ws = xlsx.utils.aoa_to_sheet(data)

    return ws;

}