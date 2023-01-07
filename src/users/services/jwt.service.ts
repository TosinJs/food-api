import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtTokenService {
    constructor(){}

    generateIdToken(payload: tokenPayload, expiryTime: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, '', {
                expiresIn: expiryTime,
                issuer: "RilHomie"
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
}

