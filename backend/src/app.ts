import cors from "cors";
import  express  from "express";
import { authRouter } from "./routes/UserRoutes";
import { eventsRouter } from "./routes/EventsRoutes";
import { eventsOptRouter } from "./routes/EventsOptRoutes";

const app = express()

app.use(cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use('/api', authRouter)
app.use('/api', eventsRouter)
app.use('/api', eventsOptRouter)

const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})
