const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
let command_var = '!';

//Configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//Initialize bot
const bot = new Discord.Client();
const bot_return = bot.login(auth.token);
bot.once('ready', () => {
    logger.info(bot_return.toString());
    logger.info('Connected!');
});



bot.on('message', (message)=>{
    //The bot will only execute commands if the message starts with the command var
    //The current default is '!'
    if (message.content.substring(0,1) === command_var){
        let args = message.content.substring(1).split(" ");
        const cmd = args[0];

        args = args.splice(1);
        logger.info(args);
        switch (cmd){
            case 'ping':
                message.channel.send('pong')
                break;
            case 'update':
                message.channel.send('Shutting down to update')
                break;
            case 'srccode':
                message.channel.send('Find my source code here! https://github.com/ahuston-0/Tommy-Bot')
                break;
            case 'help':
                message.channel.send("Command List\n" +
                    "To execute commands, call the bot with " + command_var + "< command >\n\n" +
                    "Fully Functional\n" +
                    "help, ping, srccode\n\n" +
                    "WIP\n"+
                    "update")
                break;
            case 'kill':
                message.channel.send('Agh you got me! Goodbye.');
                return process.exit(1);
            default:
                break;
        }
    }
});