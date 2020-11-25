//zmienne, stałe

var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require("path")
var bodyParser = require("body-parser");
const { table } = require("console");
let nie_ma = true

var tab = [
    { id: 1, log: "AAA", pass: "PASS1", wiek: 10, uczen: "checked", plec: "m" },
    { id: 2, log: "BBB", pass: "PASS2", wiek: 17, uczen: "", plec: "k" },
    { id: 3, log: "CCC", pass: "PASS3", wiek: 9, uczen: "", plec: "m" },
    { id: 4, log: "DDD", pass: "PASS4", wiek: 12, uczen: "checked", plec: "k" },
    { id: 5, log: "EEE", pass: "PASS5", wiek: 11, uczen: "checked", plec: "m" },
]

let a = 5
let zalogowany = 0

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.get("/admin", function (req, res) {
    if (zalogowany == 0) {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
    else {
        res.sendFile(path.join(__dirname + "/static/adminTrue.html"))
    }

})
app.get("/logout", function (req, res) {
    zalogowany = 0
    res.redirect("/")
})

app.post("/register", function (req, res) {
    nie_ma = true
    for (let i = 0; i < tab.length; i++) {
        if (req.body.log == tab[i].log) {
            nie_ma = false
            res.send("Login: " + req.body.log + " jest zajęty")
        }
    }
    if (nie_ma) {
        a += 1
        let uczony = { id: a, log: req.body.log, pass: req.body.pass, wiek: parseFloat(req.body.wiek), uczen: req.body.uczen, plec: req.body.plec }
        tab.push(uczony)
        console.log(tab)
        res.send("Zostałeś zarejestrowany: " + req.body.log)
    }
})

app.post("/login", function (req, res) {
    let bledny = true
    for (let i = 0; i < tab.length; i++) {
        if (req.body.log == tab[i].log) {
            bledny = false
            if (req.body.pass == tab[i].pass) {
                zalogowany = 1
                res.redirect("/admin")
            }
        }
    }
    if (bledny) {
        res.send("Błędny login lub hasło.")
    }
})

app.all("/show", function (req, res) {
    if (zalogowany == 1) {
        tab.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        })
        var strona = '<body style="background-color: black;"></body><a style="color: yellow; font-size: 30pt; font-family: OCR A Std, monospace;" href="sort">sort</a>'
        strona += '<a style="color: yellow; font-size: 30pt; padding-left: 20px; font-family: OCR A Std, monospace;" href="gender">gender</a>'
        strona += '<a style="color: yellow; font-size: 30pt; padding-left: 20px; font-family: OCR A Std, monospace;" href="show">show</a>'
        strona += '<table style="padding-top: 100px; width: 100%;">'
        for (let i = 0; i < tab.length; i++) {
            strona += '<tr style="height: 100px; text-align: center;">'
            strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'id: ' + tab[i].id + '</td>'
            strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'user: ' + tab[i].log + ' - ' + tab[i].pass + '</td>'
            if (tab[i].uczen == 'checked') {
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'uczeń: ' + '<input type="checkbox" checked disabled>' + '</td>'
            }
            else {
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'uczeń: ' + '<input type="checkbox" disabled>' + '</td>'
            }
            strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'wiek: ' + tab[i].wiek + '</td>'
            if (tab[i].plec == "k") {
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'płeć: ' + 'k' + '</td>'
            }
            else {
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'płeć: ' + 'm' + '</td>'
            }
            strona += "</tr>"
        }
        strona += "</table>"
        res.send(strona)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
})

app.get("/gender", function (req, res) {
    if (zalogowany == 1) {
        tab.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        })
        var strona = '<body style="background-color: black;"></body><a style="color: yellow; font-size: 30pt; font-family: OCR A Std, monospace;" href="sort">sort</a>'
        strona += '<a style="color: yellow; font-size: 30pt; padding-left: 20px; font-family: OCR A Std, monospace;" href="gender">gender</a>'
        strona += '<a style="color: yellow; font-size: 30pt; padding-left: 20px; font-family: OCR A Std, monospace;" href="show">show</a>'
        strona += '<table style="margin-top: 100px; width: 100%;">'
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].plec == "k") {
                strona += '<tr style="height: 100px; text-align: center;">'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'id: ' + tab[i].id + '</td>'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'płeć: ' + 'k' + '</td>'
                strona += "</tr>"
            }
        }
        strona += "</table>"
        strona += '<table style="margin-top: 100px; width: 100%;">'
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].plec == "m") {
                strona += '<tr style="height: 100px; text-align: center;">'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'id: ' + tab[i].id + '</td>'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'płeć: ' + 'm' + '</td>'
                strona += "</tr>"
            }
        }
        strona += "</table>"
        res.send(strona)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
})

var w = 2
app.all("/sort", function (req, res) {
    if (zalogowany == 1) {
        var strona = '<body style="background-color: black;"></body><a style="color: yellow; font-size: 30pt; font-family: OCR A Std, monospace;" href="sort">sort</a>'
        strona += '<a style="color: yellow; font-size: 30pt; padding-left: 20px; font-family: OCR A Std, monospace;" href="gender">gender</a>'
        strona += '<a style="color: yellow; font-size: 30pt; padding-left: 20px; font-family: OCR A Std, monospace;" href="show">show</a>'
        strona += '</br></br></br>'
        if (req.body.ok == 2) {
            w = 2
        }
        else {
            w = 1
        }
        if (w == 2) {
            strona += '<form onchange="this.submit()" method="POST"><label style="color: white; font-size: 20pt; margin-top: 100px;">Malejąco: </label><input type="radio" name="ok" value="1" ><label style="color: white; font-size: 20pt; margin-top: 100px;">Rosnąco: </label><input type="radio" name="ok" value="2" checked="checked"></form>'
            tab.sort(function (a, b) {
                return parseFloat(a.wiek) - parseFloat(b.wiek);
            })
            strona += '<table style="padding-top: 70px; width: 100%;">'
            for (let i = 0; i < tab.length; i++) {
                strona += '<tr style="height: 100px; text-align: center;">'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'id: ' + tab[i].id + '</td>'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'user: ' + tab[i].log + ' - ' + tab[i].pass + '</td>'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'wiek: ' + tab[i].wiek + '</td>'
                strona += '</tr>'
            }
            strona += '</table>'
        }
        else if (w == 1) {
            strona += '<form onchange="this.submit()" method="POST"><label style="color: white; font-size: 20pt; margin-top: 100px;">Malejąco: </label><input type="radio" name="ok" value="1" checked="checked"><label style="color: white; font-size: 20pt; margin-top: 100px;">Rosnąco: </label><input type="radio" name="ok" value="2"></form>'
            tab.sort(function (a, b) {
                return parseFloat(b.wiek) - parseFloat(a.wiek);
            })
            strona += '<table style="padding-top: 70px; width: 100%;">'
            for (let i = 0; i < tab.length; i++) {
                strona += '<tr style="height: 100px; text-align: center;">'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'id: ' + tab[i].id + '</td>'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'user: ' + tab[i].log + ' - ' + tab[i].pass + '</td>'
                strona += '<td style="border: 1px solid yellow; color: white; font-size: 20pt;">' + 'wiek: ' + tab[i].wiek + '</td>'
                strona += '</tr>'
            }
            strona += '</table>'
        }
        res.send(strona)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
})

app.use(express.static('static'))

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})