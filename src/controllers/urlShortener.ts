
import {
    Request,
    Response
} from "express"
import { getShortUrl, shortenUrl } from "../config/db"
import cache from "../config/redis"
import { generateShortId } from "../controllers/hashGenerator"
import { parseExpirationDate } from "../utils/durationParser"



const shorten = async (req: Request, res: Response) => {
    const {url, expiration} = req.body
    const expireDate = expiration ? parseExpirationDate(expiration) : null;
    const newShortUrl = await shortenUrl(url, generateShortId(), expireDate)
    res.send(newShortUrl)
}
const getShort = async (req: Request, res: Response) => {
    const { shortCode } = req.params
    try {
        const urlFromDb = await getShortUrl(shortCode)
        if (urlFromDb) {
            await cache.set(shortCode, JSON.stringify(urlFromDb), "EX", 60)
            cache.publish('clicks', shortCode)
            res.redirect(urlFromDb.longUrl)
        } else {
            res.status(404).send("No shortCode Found")
        }
    } catch(e) {
        res.status(404).send('Url Not Found')
    }
}


export = {
    shorten,
    getShort
}