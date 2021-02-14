const Discord = require('discord.js');
const path = require('path');
const klaw = require('klaw');

/***
 * @name CommandManager
 */
module.exports = class CommandManager {
    commands;
    aliases;
    client;
    /***
     * @constructor
     */
    constructor(client) {
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.client = client;
    }
    /***
     * @param commandName {string} - The command name.
     * @param path {string} - The command path.
     */
    async registerCommand(commandName, cmdPath) {
        try {
            const Command = require(`${cmdPath}${path.sep}${commandName}`);
            const cmd = new Command(this.client);
            cmd.location = cmdPath;
            if (cmd.beforeRegister) {
                cmd.beforeRegister(this.client);
            }
            this.commands.set(cmd.name, cmd);
            for (const alias of cmd.aliases) {
                this.aliases.set(alias, cmd.name);
            }
            return false;
        } catch (err) {
            return `Unable to load command: ${commandName} - ${err}`;
        }
    }

    async unregisterCommand(commandName, cmdPath) {
        let cmd;
        if (this.commands.has(commandName)) cmd = this.commands.get(commandName);
        else if (this.aliases.has(commandName)) this.aliases.get(commandName);
        if (!cmd) return `Nonexistent command: ${commandName}`;
        if (cmd.beforeUnregister) {
            cmd.beforeUnregister(this.client);
        }
        delete require.cache[require.resolve(`${cmdPath}${path.sep}${commandName}.js`)];
        return false;
    }
}