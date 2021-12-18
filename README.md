# discord-bot

My first discord bot!

# Instruction for forever node module

## For starting bot

```
forever start ./src/bot.js
```

## If you want to specify the logging files for any console output

```
forever -o out.log -e err.log start ./src/bot.js
```

## You can also stop, restart, and list as follows:

```
$ forever stop ./src/bot.js
$ forever restart ./src/bot.js
$ forever list
$ forever stopall
```

## Reference

https://shiffman.net/a2z/bot-ec2/
