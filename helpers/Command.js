const Discord = require('discord.js');

/**
 * @public
 * @class Command - Our main command class.
 * */
module.exports = class Command {
    /**
     * @property name - Command name.
     * @property description - Command description.
     * @property usage - Command usage.
     * @property category - Command category.
     * @property isEnabled - Is the command enabled?
     * @property isGuildOnly - Is the command guild only?
     * @property aliases - Command aliases.
     * @property client - Discord Client
     * */
    name;
    description;
    usage;
    category;
    isEnabled;
    isGuildOnly;
    aliases;
    client;
    /**
     * @constructor
     * @public
     * @param client {Discord.Client} - Discord Client
     * @param name {string|null} - Command name.
     * @param description {string} - Command description.
     * @param usage {string} - Command usage.
     * @param isEnabled {boolean} - Is the command enabled?
     * @param isGuildOnly {boolean} - Is the command guild only?
     * @param aliases {string[]} - Our command aliases.
     * */
    constructor(client, {
        name = null,
        description = 'No description provided.',
        usage = 'test',
        isEnabled = true,
        isGuildOnly = false,
        aliases = []
    }) {
        if (!client && typeof client !== Discord.Client) throw new Error('Client must be defined as a first parameter and of type Discord.Client!');
        this.client = client;
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.isEnabled = isEnabled;
        this.isGuildOnly = isGuildOnly;
        this.aliases = aliases;
    }
}