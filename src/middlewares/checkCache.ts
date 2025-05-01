import {
    Request,
    Response,
     NextFunction
} from "express"
import {
    getShortUrl
} from "../config/db"
import cache from "../config/redis"
import { parse } from "path"

export const checkUrlCache = async (req: Request, res: Response, next: NextFunction) => {
    const { shortCode } = req.params
    try {
        // if key exist send key to user
        const key = await cache.get(shortCode)
        if (key === null) {
            next()
        } else {
            const parsedOriginUrl = JSON.parse(key)
            req.params.expirationDate = parsedOriginUrl.expire_date
            req.params.longUrl = parsedOriginUrl.longUrl
            next()
        }

    } catch(e) {
        console.log('dont find')
        // if key not exist go to the next middleware which is db Check
        next()
    }
}