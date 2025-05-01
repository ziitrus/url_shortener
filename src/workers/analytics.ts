import cache from "../config/redis"
import {
    getShortUrl
} from "../config/db"

const listener = cache

async function analyticsWorker() {
    listener.subscribe('clicks', (err) => {
        if (err) {
            console.log("subscriber down")
            return
        }
    })

    listener.on('message', async (channel, shortCode) => {
        try {
            await getShortUrl(shortCode)
        } catch(e) {
            console.log('Count failed')
        }
    })
}

analyticsWorker()