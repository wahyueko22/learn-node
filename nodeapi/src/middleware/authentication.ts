'use strict';

import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import admin from './fireabase-auth';

export interface RequestWithUser extends Request {
    user?: {
        id?: string,
        email?: string,
        role?: string
    },
    company_id?: string;
}

const checkAuthentication = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try{
        let token: any;
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1]
        } else {
            token = req.headers.authorization
        }

        let domain = '';
        if (req.headers && req.headers.domain) {
            domain = req.headers.domain as string;
        }

        console.log(token);
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        console.log("decodedToken", JSON.stringify(decodedToken))
        const userInfo = await admin.auth().verifyIdToken(token);
        console.log(userInfo);
        req.user = userInfo;
        // const auth: any = await authentication(token);
       // req.user = auth.data

        
        next()
    }catch (err) {
    }
}

export { checkAuthentication }