# Noob Bot

## Before you start running the bot

-  Make sure you create `logs` folder in the root directory as well as `restart.txt` and `crash_logs.txt` inside it.

## Instruction for forever node module

### For starting bot

```
forever start ./src/bot.js
```

### If you want to specify the logging files for any console output

```
forever -o out.log -e err.log start ./src/bot.js
```

### You can also stop, restart, and list as follows:

```
$ forever stop ./src/bot.js
$ forever restart ./src/bot.js
$ forever list
$ forever stopall
```

### Reference

https://shiffman.net/a2z/bot-ec2/

## SSH Instruction

`ssh -i noob-dev-oracle-cloud.key ubuntu@<server-public-ip-address>`

## PM2 instructions

-  To start the bot, run: `pm2 start bin/run.sh`. **Make sure to setup [PM2](https://pm2.io/) beforehand**.

## Note

-  **IMPORTANT:** Make sure you are using nodejs v16.14.0 or above (Wasted more than an hour the other day because of this)
