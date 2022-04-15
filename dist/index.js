"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.once('ready', () => {
    console.log('TommyBot is ready!');
});
console.log(process.env.token);
client.login(process.env.token);
//# sourceMappingURL=index.js.map