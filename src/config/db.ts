import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getShortUrl (shortCode: string)  {
    return await prisma.url.update({
        where: {
            shortCode
        },
        data: {
            clicks: {
                increment: 1
            }
        },
        select: {
            longUrl: true,
            expire_date: true
        }
    })
}

async function getExpireDate (shortCode: string) {
    return await prisma.url.findUnique({
        where: {
            shortCode
        },
        select: {
            expire_date: true
        }
    })
}

async function getShortCodeStats (shortCode: string) {
    return await prisma.url.findUnique({
        where: {
            shortCode
        },
        select: {
            clicks: true
        }
    })
}

async function shortenUrl(url: string, shortCode: string, expirationDate: Date | null) {
    const entry = await prisma.url.create({
        data: {
            longUrl: url,
            shortCode,
            shortUrl: `${process.env.API_URL}/${shortCode}`,
            expire_date: expirationDate
        }
    })
    return entry

}

export {
    getShortUrl,
    shortenUrl,
    getShortCodeStats,
    getExpireDate
}