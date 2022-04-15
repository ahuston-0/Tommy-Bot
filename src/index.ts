import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('TommyBot is ready!');
})

client.login(process.env.token);
