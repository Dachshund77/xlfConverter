var fs = require('fs');
var xml2js = require('xml2js');



module.exports.readXlf = function readXlf(filename) {

    var returnValue = null
    var parser = new xml2js.Parser();

    fs.readFile("messages.en.xlf", function(err, data) {
        parser.parseString(data, function(err, result) {


            //.log('result');
            //console.log(result);
            //console.log('result.xliff');
            //console.log(result.xliff);
            //console.log('result.xliff.$');
            //console.log(result.xliff.$);
            //console.log('result.xliff.file');
            //console.log(result.xliff.file);
            //console.log('result.xliff.file[0]');
            //console.log(result.xliff.file[0]);
            //console.log('result.xliff.file[0].body');
            // console.log(result.xliff.file[0].body);
            //console.log('result.xliff.file[0].body[0]');
            //console.log(result.xliff.file[0].body[0]);

            console.log(result);



        });
    });

    return returnValue
}

module.exports.writeXlf = function writeXlf(workbook) {
    // Here i basically read the speadsheet and rebuild xlf
}