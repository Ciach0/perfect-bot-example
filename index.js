const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const CommandManager = require('./helpers/CommandManager');
const path = require('path');
const klaw = require('klaw');
const sqlite = require('better-sqlite3');

const DEFAULT_PREFIX = module.exports.DEFAULT_PREFIX = 'pb!';

class ExampleBot extends Discord.Client {
    commandManager;
    db;
    constructor() {
        super();
        this.commandManager = new CommandManager(this);
        this.db = sqlite('database.db');
    }
}

const client = new ExampleBot();

const init = async () => {
    await client.db.prepare('CREATE TABLE IF NOT EXISTS config (guild_id VARCHAR(18), prefix TEXT)').run();
    klaw('./commands').on('data', async data => {
       const file = path.parse(data.path);
       if (!file.ext || file.ext !== '.js') return;
       const res = await client.commandManager.registerCommand(`${file.name}${file.ext}`, file.dir);
       if (res) console.error(res);
    });
    const events = await readdir('./events');
    for (const event of events) {
        const Event = require(`./events/${event}`);
        const e = new Event(client);
        client.on(e.name, async (...args) => await e.run(...args));
        delete require.cache[require.resolve(`./events/${event}`)];
    }
    client.login('Your token').then(() => {});
}
init().then(() => {});
