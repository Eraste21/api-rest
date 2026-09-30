const produitsRouter = require('./api/produits')
const express = require('express')
const port = 3000

app = express()
app.use(express.json())
app.use('/produits', produitsRouter)

app.get('/', (req, res) => {
    res.send({"message": "Hello World !"})
})

app.listen(port, () => {
    console.log("API is running on port", port)
})