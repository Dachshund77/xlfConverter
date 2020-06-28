var assert = require('chai').assert
var expect = require('chai').expect;

var fs = require('fs');
var xml2js = require('xml2js');
var xlsx = require('xlsx')

var xlf2Sheet = require('../lib/xlf2sheet.js')

describe('Tests for xlf2Sheet.js', function() {

    //Clean up files
    afterEach(function() {
        var fs = require('fs');

        //Rading all files in testOut
        fs.readdir('testOut', function(err, files) {
            files.forEach(element => {

                //Deleting all found files
                console.log(element);
                fs.unlink('testOut/' + element, function(err) {
                    if (err) throw err;
                });

            });
        });
        console.log('AFTER EACH');

    });

    describe('convert(argv) tests', function() {

        context('Deep equality test after conversion', function() {
            it('Converting TestFile.en.xlf and comparing with TestSheet1.ods', async function() {
                //Arrange
                var originalWB = xlsx.readFile('./testAssets/sheet/TestSheet1.ods')

                //Act
                await xlf2Sheet.convert({ file: "./testAssets/xlf/TestFile1.en.xlf", out: "./testOut/temp.ods" })
                var createdWB = xlsx.readFile('./testOut/temp.ods')

                //Assert
                expect(originalWB).to.be.deep.equal(createdWB)
            })
        })
    })
})