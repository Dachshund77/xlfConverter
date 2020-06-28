var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Tests for sheet2Xlf.js', function() {

    var xlf2sheetStub;
    var sheet2XlfStub;

    //Setup test enviroment
    beforeEach(function() {
        xlf2sheetStub = sinon.stub(require('../lib/xlf2sheet.js'), 'convert');
        sheet2XlfStub = sinon.stub(require('../lib/sheet2xlf.js'), 'convert');
    });

    //Teardown test enviroment
    afterEach(function() {
        xlf2sheetStub.restore();
        sheet2XlfStub.restore();
    });

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

    });

    describe('CLI Tests, testing the entry in application', function() {

        context('TEST 1', function() {
            it('PARAMS AND RESULT', function() {
                assert.isTrue(true)
            })
        })
    })
})