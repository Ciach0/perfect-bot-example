const Event = require('../helpers/Event');

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
           name: 'ready'
        });
    }
    async run() {
        const { db, user, guilds, users } = this.client;
        for (const guild of guilds.cache) {
            const g = guild[0];
            const row = await db.prepare('SELECT * FROM config WHERE guild_id = ?').get(g);
            if (!row) {
                console.log(`[ReadyEvent.js | Logs] No row found for ${g}, inserting...`);
                await db.prepare('INSERT INTO config (guild_id, prefix) VALUES (?, ?)').run(g, require('../index').DEFAULT_PREFIX);
            }
        }
        console.log(`Ready, logged in to ${user.tag}, serving ${guilds.cache.size} guilds for ${users.cache.size} users.`);
    }
}