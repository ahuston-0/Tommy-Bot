const fs = require("fs")
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const s_git = require('simple-git');
let config = require('./config.json');
let command_var = config.command_var;

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
    logger.info('Connected!');
    logger.info("Logged in as " + bot.user.username + "-" + bot.user.discriminator);
});



bot.on('message', (message)=>{
    //The bot will only execute commands if the message starts with the command var
    //The current default is '!'
    if (message.content.substring(0,1) === command_var){
        let args = message.content.substring(1).split(" ");
        let cmd = args[0];

        switch (cmd){
            case 'ping':
                message.channel.send('pong')
                break;
            case 'update':
                message.channel.send('Shutting down to update');
                s_git().pull("origin","master", {'--rebase':true});
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
            case 'reboot':
                message.channel.send('Resetting...')
                    .then(msg => bot.destroy())
                    .then(() => bot.login(auth.token));
                break;
            case 'cmd_var':
                command_var = args[1];
                config.command_var = command_var;
                fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) =>{
                    if (err){
                        logger.error(err);
                    }
                });
                message.channel.send('Command prefix changed to ' + command_var);
                break;
            default:
                break;
        }
    }
});
