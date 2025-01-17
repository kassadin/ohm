'use strict';

const {Command} = require('commander');

const {version} = require('../package.json');
const commands = require('./commands');

function ohmCli(userArgs, optsForTesting = {}) {
  const program = new Command();
  program.name('ohm').version(version, '-v, --version').option('-n, --dryRun', '');

  if (optsForTesting.noProcessExit) {
    program.exitOverride();
  }

  commands.forEach(({command, description, options, requiredOptions, args, action}) => {
    const cmd = program.command(command).description(description).action(action);
    (options || []).forEach(arr => cmd.option(...arr));
    (requiredOptions || []).forEach(arr => cmd.requiredOption(...arr));
    (args || []).forEach(arr => cmd.argument(...arr));
  });

  program.parse(userArgs, {from: 'user'});
}

module.exports = {
  ohmCli,
};
