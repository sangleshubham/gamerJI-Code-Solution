import express from 'express'
import route from './router/router.js'
import {generateKeyPair} from './controller/controller.js'

const app = express()
const port = 3000

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

generateKeyPair()

app.use('/', route)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))