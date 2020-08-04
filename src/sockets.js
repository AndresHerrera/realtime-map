module.exports = io => 
{
    var allClients = [];

    io.on('connection', (socket) => 
    {
        allClients.push(socket);

        console.log('New user connected !');
        let totalClients = (allClients.length);
        
        // sending to all clients, include sender
        io.emit('totalUsersConnected', totalClients);
       
        console.log("Total conectados: " + totalClients);
        
        socket.on('userCoordinates', coords => 
        {
            console.log(coords);
            //broadcast to all clients
            socket.broadcast.emit('newUserCoordinates',coords);
            socket.broadcast.emit('totalUsersConnected', totalClients);
            console.log("Total conectados: " + totalClients);
        });


        socket.on('disconnect', function() {
            console.log("disconnect");
            let i = allClients.indexOf(socket);
            allClients.splice(i, 1);
            io.emit('totalUsersConnected', totalClients );
            console.log("Total conectados: " + totalClients );
          });

    });


}