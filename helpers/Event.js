const Discord = require('discord.js');

/***
 * @class Event
 * @type {Event}
 * @public
 */
module.exports = class Event {
    client;
    name;
    /***
     * @constructor
     * @param client {Discord.Client} - The client.
     * @param name {string|null} - The event name.
     */
    constructor(client, { name = null }) {
        if (!client && typeof client !== Discord.Client) throw new Error('Client must be defined and of type Discord.Client!');
        this.name = name;
        this.client = client;
    }
    async run(ctx) {
        console.log(`${this.name}`)
    }
}