import { RequestHandler } from 'express';
import logger from '../utils/logger';

type EventHandler = {(...props: any[]): any}

const AdapterWrapperService = {

    wrapHttpHandler: (handler: RequestHandler): RequestHandler => {
        return async (req, res, next) => {
            try {
                const result = await handler(req, res, next);

                return result;
            } catch (error) {
                next(error);
            }
        };
    },

    wrapEventHandler: (handler: EventHandler) => {
        return (...args: any[]) => {
            const handlerName = handler.name;
    
            return handler(...args).catch((err: any) => {
                logger.error({
                    message: `Failed to process event handler "${handlerName}"`,
                    handlerName,
                    args,
                    errorDetail: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
        };
    }

}

export default AdapterWrapperService;
        