import "dotenv/config"
import express from "express"
import routes from "./routes"
import {json} from "body-parser"
import swaggerUi from "swagger-ui-express"
import { specs } from "./config/swagger"


const app = express()

app.use(json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use("/", routes)

app.listen(process.env.API_PORT, () => {
    console.log(`Listening on ${process.env.API_PORT}`)
})