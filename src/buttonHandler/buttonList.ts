import { Button } from './Button';
import aboutMe from './buttonFunctions/aboutMe';
import aboutServer from './buttonFunctions/aboutServer';
import closeChannel from './buttonFunctions/closeChannel';
import etourne from './buttonFunctions/etourne';
import verifyUser from './buttonFunctions/verifyUser';

const buttonList: Button[] = [
	verifyUser,
	closeChannel,
	etourne,
	aboutMe,
	aboutServer,
];

export default buttonList;
