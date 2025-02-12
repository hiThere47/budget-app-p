const express = require('express')
const http = require('http') //new
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8000
const { Server } = require('socket.io') //new
const server = http.createServer(app) //new
const io = new Server(server); //new

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    console.log('Serving your main route page')
    res.render('index')
})

app.get('/spentPage', (req, res)=>{
    console.log('Serving your Spent page')
    res.render('spentPage')
})

app.get('/remainingPage', (req, res)=>{
    console.log('Serving your Remaining page')
    res.render('remainingPage')
})

// Handle WebSocket connections, NEW
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Receive income update from one client, NEW
//     socket.on('updateIncome', (data) => {
//         // Broadcast the income update to all connected clients
//         io.emit('incomeUpdated', data);
//     });

//     socket.on('disconnect', () => {    // NEW
//         console.log('A user disconnected');
//     });
// });

// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('pageView', (data) => {
//       console.log(`Page viewed: ${data.page}`);
//     });
  
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle specific page events
    socket.on('pageView', (data) => {
        console.log(`User connected to ${data.page}`);
        socket.emit('userMessage', `Welcome to the ${data.page}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});














server.listen(process.env.PORT || PORT, ()=>{  //changed from app.listen to server.listen see note cards for why
    console.log(`The server is running on port ${PORT}! Lets Go!`)
})