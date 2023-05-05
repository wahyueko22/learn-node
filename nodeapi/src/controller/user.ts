'use strict';

import { Request, Response, Router } from "express";
import { checkAuthentication } from "../middleware/authentication";


const usersRouter = Router();
const path = '';

usersRouter.post(path + '/check-user', checkAuthentication,
async (req: any, res: Response) => {
    try {
        res.status(200).json({
            userId : req?.user?.id as string,
            email :  req?.user?.email as string,
            message: "success access",
            status: true
        })
        return;            
    } catch (err) {
    }
})

usersRouter.post(path + '/check-user1', checkAuthentication,
async (req: any, res: Response) => {
    try {
        //sddsfdsfs
        //dsfsdf
        let a= 5;
        let b = a;
        let c = 6;
        res.status(200).json({
            userId : req?.user?.id as string,
            email :  req?.user?.email as string,
            message: "success access",
            status: true
        })
        return;            
    } catch (err) {
    }
})

export default usersRouter


