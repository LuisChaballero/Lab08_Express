
var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservationList = [];

var waitingList = [];

// Routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/api/tables", function(req,res) {
    return res.json(reservationList);
});

app.get("/api/waitlist", function(req,res) {
    return res.json(waitingList);
});

app.get("/reserve", function(req,res){
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req,res){
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.post("/api/tables", function(req,res) {
    var newReservation = req.body;

    if (reservationList.length >= 5) {
        waitingList.push(newReservation);
    }
    else {
        reservationList.push(newReservation);
    }
})


app.post("/api/clear", function(req,res) {
    reservationList = [];
    waitingList = [];
})

app.listen(PORT, function() {
    console.log("App listening on Port " + PORT);
});