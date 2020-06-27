var xlf2sheet = require("./lib/xlf2sheet.js")
var sheet2xlf = require("./lib/sheet2xlf.js");


var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('toXlf', 'Conversion of Sheet to Xlf file', (yargs) => {
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


        sheet2xlf.convert(yargs.argv)
    })
    .command("toSheet", "Conversion of xlf file to Sheet", (yargs) => {
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


        xlf2sheet.convert(yargs.argv)
    })
    .demandCommand(1, 1)
    .recommendCommands() //Does the cool did you mean stuff
    .help('h')
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;



console.log(argv);



/*
console.debug("xlf >>> sheet")
xlf2sheet.convert("messages.en.xlf");

console.debug("sheet >>> xlf")
sheet2xlf.convert("Test.ods");
*/