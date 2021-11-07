require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
});

// const basicCommands = require('./commands/basicCommands');
const commandHandler = require('./commands');
const welcome = require('./commands/welcome');

//mongodb related
// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');

//status of the bot
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in BEEP BEEP 🤖`);
});

//connect to MongoDB
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const clientErrorHandler = (err, req, res, next) => {
// 	if (req.xhr) {
// 		res.status(500).send({ error: 'Something failed!' });
// 	} else {
// 		next(err);
// 	}
// };

// const logErrors = (err, req, res, next) => {
// 	console.error(err.stack);
// 	next(err);
// };

// const errorHandler = (err, req, res, next) => {
// 	res.status(500);
// 	res.render('error', { error: err });
// };

// app.use(logErrors);
// app.use(clientErrorHandler);
// app.use(errorHandler);

// mongoose
// 	.connect(process.env.MONGODB_URI, {
// 		useNewUrlParser: true,
// 		useCreateIndex: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then((mssg) => console.log('connected to db'))
// 	.catch((err) => console.log(err));

// const connection = mongoose.connection;

// connection.once('open', () => {
// 	console.log(`MongoDB database connection established successfully`);
// });

//message event listener - when anyone types a message/certain command in the text chat
client.on('message', (message) => commandHandler(message, client));

client.on('guildMemberAdd', welcome);

//add reaction roles
client.on('messageReactionAdd', (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '845261229776830464') {
		switch (name) {
			case '🖥️':
				member.roles.add('845297466521813043');
				break;

			case '💻':
				member.roles.add('845297666069233735');
				break;
		}
	}
});

//remove roles with reactions
client.on('messageReactionRemove', (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '845261229776830464') {
		switch (name) {
			case '🖥️':
				member.roles.remove('845297466521813043');
				break;

			case '💻':
				member.roles.remove('845297666069233735');
				break;
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

module.exports = { client };
