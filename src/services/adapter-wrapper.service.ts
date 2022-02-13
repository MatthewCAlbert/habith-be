import logger from '../utils/logger';

type EventHandler = {(...props: any[]): any}

export function wrapEventHandler(handler: EventHandler) {
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

        