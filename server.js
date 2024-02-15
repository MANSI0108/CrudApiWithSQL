const http = require("http")
const app = require("./index");
const Port = 5000

const server = http.createServer(app);
server.listen(Port, () => {
    console.log(`Server is Runnig on Port ${Port}...`)
})
