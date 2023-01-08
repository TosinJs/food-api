import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
    constructor(private configService: ConfigService) {}

    generateIdToken(payload: tokenPayload, expiryTime: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.configService.get('JWT_SECRET'), {
                expiresIn: expiryTime,
                issuer: 'RilHomie'
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
}

/**
 * Praise God double
 * Father, please put all my problems under your feet permanently
 * Father, Please arise for me tonight 
 * Father, please pay me a personal visit tonight. Give me a divine earthquake
 * Father, please go to my earthly source and uproot earthly evil there
 * Father. Please go to my future and erase every evil waiting for me
 * Father, Pick me up tonight and promote me everlastingly
 * Father, Please keep me forever secure in the hollow of your hand
 * Father, Please increase my strength, my ability to succeed from within me 
 * Father, please reign supreme within me
 * Father, please begin to speak to me loud and clear, let me begin to hear from you
 * Individual request for the year
 */