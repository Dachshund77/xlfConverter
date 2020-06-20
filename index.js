var fs = require('fs');
var xml2js = require('xml2js');
var xlsx = require('xlsx')


//readXlf('HARDCODED FOR NOW') //Hardcoded
readWorkBook("HARCODED FOR NOW")

function readXlf(filename) {

    var returnValue = null
    var parser = new xml2js.Parser();

    fs.readFile("messages.en.xlf", function(err, data) {
        parser.parseString(data, function(err, result) {



            writeWorkBook(result);

        });
    });
}

function writeXlf(workbook) {
    // Here i basically read the speadsheet and rebuild xlf
}

function writeWorkBook(jsonData) {
    //Create new book
    var wb = xlsx.utils.book_new();

    wsTranslation = buildTranslationsSheet(jsonData.xliff.file[0].body[0]["trans-unit"]);
    xlsx.utils.book_append_sheet(wb, wsTranslation, 'translation')

    wsXliff = buildXliffDataSheet(jsonData.xliff.$);
    xlsx.utils.book_append_sheet(wb, wsXliff, 'xliffData')

    wsFile = buildFileDataSheet(jsonData.xliff.file[0].$);
    xlsx.utils.book_append_sheet(wb, wsFile, 'fileData')


    //Write the sheet
    xlsx.writeFile(wb, 'Test.ods') //File name will be ?? and what about local
}

function readWorkBook(filename) {
    var data = xlsx.readFile('test.ods')

    console.log(data.Sheets.translation);

}

function buildTranslationsSheet(transUnitArray) {




    var data = [
        ['id', 'datatype', 'Source', 'Target', 'State', 'Source File', 'Line Number', 'Meaning prioirty', 'Meaning', 'description priority', 'description']
    ]

    for (let i = 0; i < transUnitArray.length; i++) {

        //Yeah this might only work for my file
        var row = [
            transUnitArray[i].$.id,
            transUnitArray[i].$.datatype,
            transUnitArray[i].source[0],
            transUnitArray[i].target[0]._,
            transUnitArray[i].target[0].$.state,
            transUnitArray[i]["context-group"][0].context[0]._,
            transUnitArray[i]["context-group"][0].context[1]._,
            transUnitArray[i].note[1].$.priority,
            transUnitArray[i].note[1]._,
            transUnitArray[i].note[0].$.priority,
            transUnitArray[i].note[0]._
        ]

        data.push(row)
    }

    var ws = xlsx.utils.aoa_to_sheet(data)

    return ws;
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
        ['source-language', fileAttributes["source-language"]],
        ['datatype', fileAttributes.datatype],
        ['original', fileAttributes.original],
        ['target-language', fileAttributes["target-language"]]
    ]

    var ws = xlsx.utils.aoa_to_sheet(data)

    return ws;

}