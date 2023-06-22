import { Command } from './Command';
import botInfo from './commands/botInfo';
import ban from './commands/moderation/ban';
import kick from './commands/moderation/kick';
import purge from './commands/moderation/purge';
import timeout from './commands/moderation/timeout';
import avatar from './commands/avatar';
import serverInfo from './commands/serverInfo';

const slashCommandsList: Command[] = [
	botInfo,
	ban,
	kick,
	purge,
	timeout,
	avatar,
	serverInfo,
];

export default slashCommandsList;
