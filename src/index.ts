import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('TommyBot is ready!');
  console.log('lint');
});

void client.login(process.env.token);
