const Command = require('../helpers/Command');

module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Test command',
            usage: 'test',
            isGuildOnly: false,
            isEnabled: true,
            aliases: ['test-command']
        })
    }

    run(ctx) {
        ctx.send('A dead-simple message!');
    }
}