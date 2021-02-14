module.exports = class CommandContext {
    command;
    author;
    channel;
    member;
    guild;
    client;
    message;
    args;
    constructor(client, opts) {
        this.client = client;
        this.command = opts.command;
        this.channel = opts.channel;
        this.author = opts.author;
        this.message = opts.message;
        this.args = opts.args;
        if (opts.channel.type !== 'dm') this.member = opts.member;
        else this.member = null;
        if (!!opts.guild) this.guild = opts.guild;
        else this.guild = null;
    }
    /***
     * @method
     * @name send
     * @param content {string} - The content to send.
     * @param options {object} - Message options.
     * @returns {Promise<*>}
     */
    async send(content, options) {
        return await this.channel.send(content, options);
    }
}