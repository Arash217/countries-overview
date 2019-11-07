import 'reflect-metadata';
import { AppRouter } from '../AppRouter';
import { Methods } from '../enums/Methods';
import { MetadataKeys } from '../enums/MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function requestPropValidators<K extends keyof Request>(prop: K, keys: string[]): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction): void {
        if (!req[prop]) {
            res.status(422).send('Invalid request');
            return;
        }

        for (const key of keys) {
            if (!req[prop][key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }

        next();
    };
}

export function controller(routePrefix: string): Function {
    return function(target: Function): void {
        const router = AppRouter.getInstance();

        for (const key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.bodyValidator, target.prototype, key) || [];
            const requiredParamsProps = Reflect.getMetadata(MetadataKeys.paramsValidator, target.prototype, key) || [];
            const requiredQueryProps = Reflect.getMetadata(MetadataKeys.queryValidator, target.prototype, key) || [];
            const bodyValidator = requestPropValidators('body', requiredBodyProps);
            const paramsValidator = requestPropValidators('params', requiredParamsProps);
            const queryValidator = requestPropValidators('query', requiredQueryProps);

            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    bodyValidator,
                    paramsValidator,
                    queryValidator,
                    routeHandler,
                );
            }
        }
    };
}
