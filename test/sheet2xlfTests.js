var assert = require('chai').assert
var expect = require('chai').expect;

var fs = require('fs');
var xml2js = require('xml2js');
var xlsx = require('xlsx')

var sheet2xlf = require('../lib/sheet2xlf.js')

describe('Tests for sheet2Xlf.js', function() {


    //Clean up files

    afterEach(function() {
        var fs = require('fs');

        //Rading all files in testOut
        fs.readdir('testOut', function(err, files) {
            files.forEach(element => {

                //Deleting all found files
                fs.unlink('testOut/' + element, function(err) {
                    if (err) throw err;
                });

            });
        });

    });

    describe('Conver(argv) tests', function() {
        context('Deep equality test after conversion', function() {
            it('PARAMS AND RESULT', async function() {
                //Arrange
                var parser = new xml2js.Parser();
                data = await fs.promises.readFile('./testAssets/xlf/TestFile1.en.xlf');
                var orginalXlf;
                await parser.parseStringPromise(data).then(function(result) {
                    orginalXlf = result;
                })

                //Act

                await sheet2xlf.convert({ file: "./testAssets/sheet/TestSheet1.ods", out: "./testOut/temp.xlf" })


                var parser2 = new xml2js.Parser();
                data2 = await fs.promises.readFile('./testOut/temp.xlf');



                //var cleanedString = data2.toString().replace("\ufeff", "");
                var convertedXLF;
                await parser2.parseStringPromise(data2).then(function(result2) {
                    convertedXLF = result2;
                })

                //Assert
                expect(orginalXlf).to.be.deep.equal(convertedXLF)

            })
        })
    })
})