const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

// ✅ Sirve los archivos estáticos desde /public bajo la ruta /resources
app.use("/resources", express.static(path.join(__dirname, "public")));
app.use('/dashboard', express.static(path.join(__dirname, 'vista-directivo', 'src', 'dashboard')));

app.set("view engine", "ejs");

const bcryptjs = require("bcryptjs");

const session = require('express-session');

app.use(session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: false, // ← ¡ESTO es lo importante!
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        httpOnly: true
    }
}));


const conection = require("./database/db");

// Rutas principales
app.get("/", (req, res) => {
    res.render("login");
});
app.get("/recuperar", (req, res) => {
    res.render("recuperar");
});
app.get("/registrar", (req, res) => {
    res.render("registrar");
});
app.get("/index", (req, res) => {
    res.render("index_dashboard");
});

// Registro
app.post("/register", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const name = req.body.user;
    const rol = req.body.rol;

    let passwordHash = await bcryptjs.hash(pass, 8);

    conection.query(
        "INSERT INTO users SET ?",
        { email: email, pass: passwordHash, name: name, rol: rol },
        async (error, result) => {
            if (error) {
                console.log("Error al registrar:", error);
                res.status(500).send("Error al registrar");
            } else {
                res.render("registrar", {
                    alert: true,
                    alertTitle: "Registration",
                    alertMessage: "¡Successful Registration!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }
        }
    );
});

// Autenticación
app.post("/auth", async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.render("login", {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor Ingrese email y/o contraseña",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: ''
        });
    }

    conection.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
        if (error || result.length === 0 || !(await bcryptjs.compare(pass, result[0].pass))) {
            return res.render("login", {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o password incorrectas",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: ''
            });
        }

        // Sesión iniciada
        req.session.loggedin = true;
        req.session.name = result[0].name; // asegúrate de que la columna sea "name"
        
        res.redirect("/resources/dashboard/index_dashboard.html");
    });
});


function requireLogin(req, res, next) {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect('/');
    }
}


app.get("/", (req, res) => {
    res.render("login");
});


app.get("/resources/dashboard/index_dashboard.html", requireLogin, (req, res) => {
    res.render("/resources/dashboard/index_dashboard.html", {
        login: true,
        name: req.session.name
    });
});


// Iniciar servidor
app.listen(4000, () => {
    console.log("server running at http://localhost:4000");
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});