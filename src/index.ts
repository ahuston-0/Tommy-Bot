import { Client, Intents } from 'discord.js';
import { token } from './auth.json';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('TommyBot is ready!');
})

client.login(token);
