import {
    getShortCodeStats
} from "../config/db"
import {
    Request,
    Response
} from "express"

async function getStats (req: Request, res: Response) {
    const { shortCode } = req.params
    const stats = await getShortCodeStats(shortCode)
    if (stats){
        res.send(stats)
    } else {
        res.status(404).send('No URL Found')
    }
}

export = {
    getStats
}