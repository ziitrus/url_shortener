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
    if (!expirationDate) {
        const result = await getExpireDate(shortCode)
        expirationDate = result?.expire_date?.toISOString() || null
        if (expirationDate == null) {
            next()
        } else {
            const isExpire = new Date(expirationDate) < new Date
            if (isExpire) {
                res.status(401).send("This shortCode had an expiration date")
            } else {
                next()
            }
        }
    } else {
        const isExpire = new Date(expirationDate) < new Date
        if (isExpire) {
            res.status(401).send("This shortCode had an expiration date")
        } else {
            cache.publish('clicks', shortCode)
            res.redirect(req.params.longUrl)
        }
    }
}

export {
    checkExpiration
}