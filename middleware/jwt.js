import nconf from '../config';
import jwt from 'express-jwt';

export default jwt({secret: nconf.get('auth:jwt:pub'), requestProperty: 'auth',algorithms: ['RS256','RS384','RS512' ]});