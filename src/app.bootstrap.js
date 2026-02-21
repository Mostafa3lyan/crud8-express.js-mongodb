
import { NODE_ENV, port } from '../config/config.service.js'
import { ConflictException, ErrorException, globalErrorHandling, NotFoundException, successResponse } from './common/utils/index.js'
import { authenticateDB } from './DB/connection.db.js'
import { authorRouter, authRouter, logRouter, userRouter } from './modules/index.js'
import express from 'express'

async function bootstrap() {
    const app = express()
    //convert buffer data
    app.use(express.json())
    // DB 
    await authenticateDB()
    //application routing
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use("/", authorRouter);
    app.use("/", logRouter);



    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //success response
    app.use(successResponse);

    //error-handling
    app.use(globalErrorHandling)
    app.use(ErrorException);
    app.use(NotFoundException);
    app.use(ConflictException);
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap