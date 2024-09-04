import  express  from "express";
import { authRouter } from "./routes/UserRoutes";
import { eventsRouter } from "./routes/EventsRoutes";
import { eventsOptRouter } from "./routes/EventsOptRoutes";

const app = express()

app.use(express.json())

app.use('/api', authRouter)
app.use('/api', eventsRouter)
app.use('/api', eventsOptRouter)

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})
