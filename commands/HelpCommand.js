const Discord = require('discord.js');
const Command = require('../helpers/Command');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Displays all commands, or info about specific command.',
            usage: 'help [command]',
            isEnabled: true,
            isGuildOnly: false,
            aliases: ['commands', 'cmds', 'h']
        });
    }
    async run(ctx) {
        const cmd = ctx.args[0];
        if (!cmd) {
            const arr = [];
            for (const command of this.client.commandManager.commands.array()) {
                arr.push(`\`${command.name}\``);
            }
            const embed = new Discord.MessageEmbed()
                .setTitle('Help')
                .setDescription('Listing all top-level commands. Specify a command as an argument to see its detailed information.')
                .setColor('RANDOM')
                .addField('Command list', arr.join(', '));
            return await ctx.send(embed);
        } else {
            const command = this.client.commandManager.commands.get(cmd) || this.client.commandManager.commands.get(this.client.commandManager.commands.get(cmd));
            if (!command) {
                const emb = new Discord.MessageEmbed()
                    .setTitle('❌ No command found')
                    .setDescription(`No command under the name \`${cmd}\` has been found. Please check the spelling.`)
                    .setColor('RED')
                return await ctx.send(emb);
            }
        }
    }
}