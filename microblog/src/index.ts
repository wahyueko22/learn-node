import express, { Request, Response } from "express";
import createError from "http-errors"
import { config } from 'dotenv';
config();

const app = express()

const port = process.env.PORT || 8080;

app.use(express.json())


// TODO: Routing aplikasi akan kita tulis di sini
app.get('/feed', async (req: Request, res: Response) => {

    res.json({key:"value"})
  })

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404))
})

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
)