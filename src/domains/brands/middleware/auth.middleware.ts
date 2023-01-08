import { HttpException, HttpStatus } from '@nestjs/common'
import { NextFunction, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { Role } from 'src/types/enum'
// import * as dotenv from 'dotenv'
// dotenv.config()

interface RequestWithUser extends Request {
    user: any,
    roles?: Role[],
}

function verifyToken(token: string): Promise<tokenPayload> {
    return new Promise(async (resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload: any) => {
            if (err) {
                reject(err)
                return
            }
            const returnPayload: tokenPayload = { 
                id: payload.id, username: payload.username, role: payload.role
            }
            resolve(returnPayload)
        })
    })
}

export async function VerifyIDToken(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        let tokenString = req.headers.authorization
        if (!tokenString) {
            throw new HttpException("Unauthorized, Auth Credentials Required", HttpStatus.FORBIDDEN)
        }
        const tokenArray = tokenString.split(" ")
        const user = await verifyToken(tokenArray[1])
        if (!user) {
            throw new HttpException("Unauthorized, Auth Credentials Required", HttpStatus.FORBIDDEN)
        }

        req.roles = [user.role]
        next()
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
}



