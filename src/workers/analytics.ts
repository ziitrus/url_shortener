import cache from "../config/redis"
import {
    getShortUrl
} from "../config/db"

const listener = cache

async function analyticsWorker() {
    console.log('worker starting')
    listener.subscribe('clicks', (err) => {
        console.log('subscribed')
        if (err) {
            console.log("subscriber down")
            return
        }
    })

    listener.on('message', async (channel, shortCode) => {
        try {
            await getShortUrl(shortCode)
            console.log('ONE MORE CLICK', shortCode)
        } catch(e) {
            console.log('oopsy')
        }
    })
}

analyticsWorker()