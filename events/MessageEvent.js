const Event = require('../helpers/Event');
const Discord = require('discord.js');
const CommandContext = require('../helpers/CommandContext');

module.exports = class MessageEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'message'
        });
    }
    async run(message) {
        const { db, commandManager } = this.client;
        const settings = message.guild ? await db.prepare('SELECT * FROM config WHERE guild_id = ?').get(message.guild.id) : { prefix: 'pb!' }
        if (message.author.bot) return;
        if (message.guild && !message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')) return false;
        if (message.content.indexOf(settings.prefix) !== 0) return false;
        const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
        if (!args) return false;
        const command = args.shift().toLowerCase();
        if (message.guild && !message.member) await message.guild.members.fetch(message.author);
        const cmd = commandManager.commands.get(command) || commandManager.commands.get(commandManager.aliases.get(command));
        if (!cmd) return false;
        else {
            if (!cmd.isEnabled) {
                const emb = new Discord.MessageEmbed()
                    .setTitle('❌ Disabled command')
                    .setDescription('Hey, you\'ve just discovered a command that is disabled, and therefore, cannot be run. Maybe the command is yet under construction, or the bot developer has disabled it intentionally. If you think this is an error, please contact the bot developer.')
                    .setColor('RED')
                return message.channel.send(emb);
            }
            if (!message.guild && cmd.isGuildOnly) {
                const emb = new Discord.MessageEmbed()
                    .setTitle('❌ Guild-only command')
                    .setDescription('Hey, you\'ve just ran a command that is only available in servers. Maybe this is a guild configuration command that is required to be run in a server. If you believe this is an error, please contact the bot developer.')
                    .setColor('RED')
                return message.channel.send(emb);
            }
            await cmd.run(new CommandContext(this.client, {
                command: cmd,
                author: message.author,
                channel: message.channel,
                guild: message.guild,
                member: message.member,
                args: args,
                message
            }));
            console.log(`Command ran: ${cmd.name} (by ${message.author.tag} [${message.author.id}])`);
        }
    }
}