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
});

app.get("/api/user/:id", (request, response) => { //dovhaćanje podataka o useru pod određenim id-om
    const id = request.params.id;
    connection.query("SELECT * FROM MYPLAN_user WHERE id_user=?", [id], (error, results) => {
        if (error) throw error;
        response.send(results);
    });
});


app.post("/api/unos_user", (request, response) => { //register api 
    const data = request.body;
    unos_user = [[data.ime, data.email, data.lozinka, data.datumRod]]
    connection.query("INSERT INTO MYPLAN_user (user_ime, user_email, user_password, user_datumRod) VALUES ?", [unos_user], (error, results) => {
        if (error) throw error;
        response.send(results);
    });
});

app.post("/api/login", (request, response) => { //login api
    const data = request.body;
    email=data.email;
    password=data.password;


    connection.query("SELECT * FROM MYPLAN_user WHERE user_email = ? AND user_password = ?", [email, password], (error, results) => {
      if (error) throw error;
  
      if (results.length === 0) {
        return response.status(401).json({ error: "Pogrešan email ili lozinka" });
    }
  
      const user = results[0];
      if(user.admin == 1 ){ // provjera da li je user admin
        response.json({
              id_user: user.id_user,
              user_ime: user.user_ime,
              user_email: user.user_email,
              user_password: user.user_password,
              user_admin: user.admin
          });
      }
      else{
        response.json({//ovdje user se upisuje
              id_user: user.id_user,
              user_ime: user.user_ime,
              user_email: user.user_email,
              user_password: user.user_password
          });
      }
    });
  });

  app.post("/api/user_ime", (request, response) => { //izmjena imena
    const data = request.body;
    user_id = data.id
    user_ime = data.ime
    connection.query("UPDATE MYPLAN_user SET user_ime= ? WHERE id_user = ? ", [user_ime, user_id], (error, results) => {
        if (error) throw error;
        response.send(results);
    });
});

app.post("/api/user_email", (request, response) => { //izmjena emaila
    const data = request.body;
    user_id = data.id
    user_email = data.email
    connection.query("UPDATE MYPLAN_user SET user_email= ? WHERE id_user = ? ", [user_email, user_id], (error, results) => {
        if (error) throw error;
        response.send({message: 'Email uspiješno promjenjen.'});
    });
});


app.post("/api/user_lozinka", (request, response) => { //izmjena lozinke
    const data = request.body;
    user_id = data.id
    user_password = data.lozinka
    connection.query("UPDATE MYPLAN_user SET user_password= ? WHERE id_user = ? ", [user_password, user_id], (error, results) => {
        if (error) throw error;
        response.send({message: 'Lozinka uspiješno promjenjena.'});
    });
});

app.delete('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('DELETE FROM MYPLAN_user WHERE id_user = ?', [userId], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Korisnik uspješno obrisan' });
    });
});




app.listen(port, () => {
    console.log("Server running at port: " + port);
});
