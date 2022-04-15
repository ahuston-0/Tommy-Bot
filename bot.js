/* eslint-disable */
const fs = require('fs');
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const s_git_promise = require('simple-git/promise')();
const welcome_msgs = require('./welcome_messages.json');
let config = require('./config.json');
let command_var = config.command_var;

//Configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = 'debug';

//Initialize bot
const bot = new Discord.Client();
bot.login(auth.token);
bot.once('ready', () => {
  logger.info('Connected!');
  logger.info(
    'Logged in as ' + bot.user.username + '-' + bot.user.discriminator
  );
});

bot.on('message', (message) => {
  //The bot will only execute commands if the message starts with the command var
  //The current default is '!'
  if (message.content.substring(0, 1) === command_var) {
    let args = message.content.substring(1).split(' ');
    let cmd = args[0].toLocaleLowerCase();

    switch (cmd) {
      case 'ping':
        message.channel.send('pong');
        break;
      case 'update':
        message.channel.send('Pulling latest updates from GitHub');
        s_git_promise.pull().then(
          (success) => {
            message.channel.send('Update successful, please restart me!');
          },
          (failed) => {
            message.channel.send('Update failed, please check logs');
          }
        );
        break;
      case 'srccode':
        message.channel.send(
          'Find my source code here! https://github.com/ahuston-0/Tommy-Bot'
        );
        break;
      case 'help':
        message.channel.send(
          '**Command List**\n' +
            'To execute commands, call the bot with ' +
            command_var +
            'command\n\n' +
            '**All Users**\n' +
            'Help - This list of commands\n' +
            'Ping - A little game the dev and I use to test\n' +
            'SrcCode - A link to my source code!\n\n' +
            '**Admins**\n' +
            `Cmd_Var - Change the command prefix from ${command_var}\n` +
            'Reboot - Soft reboot me\n' +
            'Update - Pull the latest version of me from GitHub'
        );
        break;
      case 'reboot':
        message.channel
          .send('Resetting...')
          .then((msg) => bot.destroy())
          .then(() => bot.login(auth.token));
        break;
      case 'cmd_var':
        command_var = args[1];
        config.command_var = command_var;
        fs.writeFile(
          './config.json',
          JSON.stringify(config, null, 4),
          (err) => {
            if (err) {
              logger.error(err);
            }
          }
        );
        message.channel.send('Command prefix changed to ' + command_var);
        break;
      default:
        break;
    }
  }
});

bot.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.find((ch) => ch.name === 'general');
  const keys = Object.keys(welcome_msgs);
  const rand_index = Math.floor(Math.random() * keys.length);
  const rand_key = keys[rand_index];
  const message = welcome_msgs[rand_key];
  if (!channel) return;
  channel.send(message + `Welcome to the server, ${member}!`);
});
