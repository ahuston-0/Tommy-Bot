"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const auth_json_1 = require("./auth.json");
console.log(auth_json_1.token);
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.once('ready', () => {
    console.log('TommyBot is ready!');
});
client.login(auth_json_1.token);
//# sourceMappingURL=index.js.map