const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
    host: 'student.veleri.hr',
    user: 'slezaja',
    password: '11',
    database: 'slezaja'
});

app.use(express.urlencoded({ extended: true }));

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get("/api/user", (request, response) => { // dohvaćanje svih user-a

    connection.query("SELECT * FROM MYPLAN_user", (error, results) => {
        if (error) throw error;
        response.send(results);
    });
    /*
    req - request - slanje zahtjeva s klijentske strane
    res - response - slanje odgovora sa server strane

    */
});

app.get("/api/user/:id_user", (request, response) => { //dovhaćanje podataka o useru pod određenim id-om
    const id = request.params.id;
    connection.query("SELECT * FROM knjiga WHERE id_user=?", [id], (error, results) => {
        if (error) throw error;
        response.send(results);
    });
});

/*app.post("/api/rezerv_knjige", (request, response) => {
    const data = request.body;
    rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]]
    connection.query("INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
        if (error) throw error;
        response.send(results);
    });
    //response.send("Poslano" + data.id_knjiga);
});
*/

app.post("/api/unos_user", (request, response) => {
    const data = request.body;
    unos_user = [[data.ime, data.email, data.lozinka, data.datumRod]]
    connection.query("INSERT INTO MYPLAN_user (user_ime, user_email, user_password, user_datumRod) VALUES ?", [unos_user], (error, results) => {
        if (error) throw error;
        response.send(results);
    });
    //response.send("Poslano" + data.id_knjiga);
});


app.listen(port, () => {
    console.log("Server running at port: " + port);
});

// npm install -g nodemon