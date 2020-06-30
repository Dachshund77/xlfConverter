var xlf2sheet = require("./lib/xlf2sheet.js")
var sheet2xlf = require("./lib/sheet2xlf.js");

var argv = require('yargs').
usage('Usage: $0 <command> [options]')
    .command('sheet2Xlf', 'Conversion of Sheet to Xlf file', (yargs) => {
        yargs
            .usage("Usage: $0 toXlf [options]")
            .option('file', {
                alias: 'f',
                description: 'Path to source file',
                demandOption: true,
                type: 'string'
            })
            .option('out', {
                alias: 'o',
                description: 'Output file/dir',
                demandOption: true,
                type: 'string'
            })
    }, (argv) => {
        setVerbosity(argv)
        sheet2xlf.convert(argv)
    })
    .command("xlf2Sheet", "Conversion of xlf file to Sheet", (yargs) => {
        yargs
            .usage("Usage: $0 toSheet [options]")
            .option('file', {
                alias: 'f',
                description: 'Path to source file',
                demandOption: true,
                type: 'string'
            })
            .option('out', {
                alias: 'o',
                description: 'Output file/dir',
                demandOption: true,
                type: 'string'
            })
    }, (argv) => {
        setVerbosity(argv)
        xlf2sheet.convert(argv)
    })
    .option('verbose', {
        alias: 'V',
        describe: 'Level of feedback',
        choices: [0, 1, 2, 3, 4, 5],
        default: 3,
        type: 'number',
    })
    .demandCommand(1, 1)
    .recommendCommands() //Does the cool did you mean stuff
    .help('h')
    .alias('help', 'h')
    .alias('version', 'v')
    .showHelpOnFail(true)
    .strict()
    .argv;


function setVerbosity(argv) {

    var level = argv.verbose

    // 0 - Disable all
    //Disable error on less than 1
    if (level < 1) {
        console.error = function() {};
    }

    //Disable warn  on less than 2
    if (level < 2) {
        console.warn = function() {};
    }

    //Disable info  on less than 3
    if (level < 3) {
        console.info = function() {};
    }

    //Disable debug on less than 4
    if (level < 4) {
        console.debug = function() {};
    }

    //Disable log on less than 5
    if (level < 5) {
        console.log = function() {};
    }

}