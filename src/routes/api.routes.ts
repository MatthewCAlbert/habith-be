import express from 'express';
import ApiController from '../controllers/api.controller';
import jwtTokenMiddleware from '../middlewares/jwttoken.middleware';

// General API Routes /v1
const apiRouter = express.Router();

apiRouter.get('/', ApiController.helloWorldHandler);

apiRouter.get('/users', ApiController.allUser);
apiRouter.delete('/all', ApiController.clearDb);

apiRouter.get('/protected', jwtTokenMiddleware, ApiController.testAuth);

export default apiRouter;
