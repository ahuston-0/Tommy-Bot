import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('TommyBot is ready!');
})

console.log(process.env.token);
client.login(process.env.token);
