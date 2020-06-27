var fs = require('fs');
var xml2js = require('xml2js');
var xlsx = require('xlsx')

exports.convert = function convert(argv) {

    console.log(argv);
    console.log(argv.file);

    var wb = xlsx.readFile(argv.file)

    //Init values
    var xlfJson = {};

    //Split into sheets

    var translationSheet = wb.Sheets["translation"]
    var xliffSheet = wb.Sheets["xliffData"]
    var fileSheet = wb.Sheets["fileData"]

    //Rebuild xliff level
    xlfJson.xliff = buildXlfJson(xliffSheet);

    //Rebuild file level
    xlfJson.xliff.file = buildFileJson(fileSheet);

    //Rebuild body
    xlfJson.xliff.file[0].body = [body = {}]

    //Rebuild trans-units arrya
    xlfJson.xliff.file[0].body[0] = buildTransUnitsJson(translationSheet);

    //Build finally
    var builder = new xml2js.Builder({
        xmldec: { version: '1.0', encoding: 'UTF-8', standalone: null }
    });

    //Add to the JsonObject


    //Build and write
    var xlf = builder.buildObject(xlfJson);

    fs.writeFile(argv.out, xlf, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('updated!');
        }
    });
}


function buildXlfJson(xliffSheet) {

    let xliff = {
        $: {
            [xliffSheet['A1'].v]: xliffSheet['B1'].v,
            [xliffSheet['A2'].v]: xliffSheet['B2'].v
        }
    }

    return xliff;
}

function buildFileJson(fileSheet) {

    let file = {
        $: {
            [fileSheet['A1'].v]: fileSheet['B1'].v,
            [fileSheet['A2'].v]: fileSheet['B2'].v,
            [fileSheet['A3'].v]: fileSheet['B3'].v,
            [fileSheet['A4'].v]: fileSheet['B4'].v
        }
    }

    return [file]
}

function buildTransUnitsJson(translationSheet) {

    let returnArray = new Array();


    var range = xlsx.utils.decode_range(translationSheet['!ref']);
    console.log(range);
    for (let row = 1; row <= range.e.r; row++) {

        var temp = {
            ['trans-unit']: {
                $: {
                    [translationSheet['A1'].v]: translationSheet[xlsx.utils.encode_cell({ r: row, c: 0 })].v,
                    [translationSheet['B1'].v]: translationSheet[xlsx.utils.encode_cell({ r: row, c: 1 })].v
                },
                [translationSheet['C1'].v]: translationSheet[xlsx.utils.encode_cell({ r: row, c: 2 })].v,
                [translationSheet['D1'].v]: {
                    $: {
                        [translationSheet['E1'].v]: translationSheet[xlsx.utils.encode_cell({ r: row, c: 4 })].v,
                    },
                    _: translationSheet[xlsx.utils.encode_cell({ r: row, c: 3 })].v
                },
                ['context-group']: {
                    $: { purpose: "location" },
                    "context": [{
                        $: {
                            ['context-type']: 'sourcefile'
                        },
                        _: translationSheet[xlsx.utils.encode_cell({ r: row, c: 5 })].v

                    }, {
                        $: {
                            ['context-type']: 'linenumber'
                        },
                        _: translationSheet[xlsx.utils.encode_cell({ r: row, c: 6 })].v
                    }]
                },
                'note': [{
                    $: {
                        "priority": translationSheet[xlsx.utils.encode_cell({ r: row, c: 9 })].v,
                        "from": "description"
                    },
                    _: translationSheet[xlsx.utils.encode_cell({ r: row, c: 10 })].v
                }, {
                    $: {
                        "priority": translationSheet[xlsx.utils.encode_cell({ r: row, c: 7 })].v,
                        "from": "meaning"
                    },
                    _: translationSheet[xlsx.utils.encode_cell({ r: row, c: 8 })].v
                }]
            }

        }

        returnArray.push(temp);

    }



    return returnArray
}