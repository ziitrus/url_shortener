import {
    getExpireDate
} from "../config/db"
import cache from "../config/redis"
import {
    Request,
    Response,
    NextFunction
} from "express"

async function checkExpiration (req: Request, res: Response, next: NextFunction) {
    let { shortCode } = req.params
    let expirationDate: string | null = req.params.expirationDate
    // check if expirationDate is given by cached key
    if (!expirationDate) {
        // if not get expireDate From DB
        const result = await getExpireDate(shortCode)
        expirationDate = result?.expire_date?.toISOString() || null
        if (expirationDate == null) {
            // if there is no expiration date pass the middleware
            next()
        } else {
            // Check for expiration 
            const isExpire = new Date(expirationDate) < new Date
            if (isExpire) {
                res.status(401).send("This shortCode had an expiration date")
            } else {
                next()
            }
        }
    } else {
        // Same check with expiration from key
        const isExpire = new Date(expirationDate) < new Date
        if (isExpire) {
            res.status(401).send("This shortCode had an expiration date")
        } else {
            // call redis to register click
            cache.publish('clicks', shortCode)
            res.redirect(req.params.longUrl)
        }
    }
}

export {
    checkExpiration
}