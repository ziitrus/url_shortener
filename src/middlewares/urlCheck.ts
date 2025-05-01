import {
    Response,
    Request,
    NextFunction
} from "express"

export const isUrl = async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body
    console.log(url)
    try {
        const urlChecker = await fetch(url, {
            signal: AbortSignal.timeout(2000)
        })
        if (urlChecker) {
            next()
        }
    } catch(e) {
        res.status(400).send("Looks like your URL reach nothing")

    }
}