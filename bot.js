const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
let command_var = '!'

//Configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//Initialize bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function(evt){
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + '-(' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt){
    //The bot will only execute commands if the message starts with the command var
    //The current default is '!'
    if (message.substring(0,1) === command_var){
        let args = message.substring(1).split(" ");
        const cmd = args[0];

        args = args.splice(1);
        logger.info(args);
        switch (cmd){
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'update':
                bot.sendMessage({
                    to: channelID,
                    message: 'Shutting down to update'
                });
                break;
            case 'srccode':
                bot.sendMessage({
                    to: channelID,
                    message: 'Find my source code here! '
                })
            default:
                break;
        }
    }
});