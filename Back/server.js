const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4100;
const mysql = require('mysql');
const path = require('path');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'databaseBAM'
});
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const multer = require('multer');
const { query } = require('express');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './Images')
    },
    filename: function (_req, _file, cb) {
        cb(null, Date.now() + path.extname(_file.originalname));
    }
})

const upload = multer({ storage: storage })

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));
//GET


app.get('/', (_req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/projects', (_req, res) => {
    connection.query('SELECT * FROM projects', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

app.get('/project/:id', (req, res) => {
    connection.query('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

app.get('/image/:id', (req, res) => {
    connection.query('SELECT * FROM images WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});
app.get('/image/:name', (req, res) => {
    connection.query('SELECT * FROM images WHERE name = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

//POST

app.post('/project', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    const queryProject = `INSERT INTO projects (title, description, id_image_1) VALUES (?, ?, ?)`;
    const params = [req.body.title, req.body.description, req.body.id_image_1];
    connection.query(queryProject, params, (err, rows) => {
        if (err) throw err;
        res.sendStatus(200).json(rows);
    });
});

app.post('/image', upload.single('file'), (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const queryPost = `INSERT INTO images (name, path) VALUES ('"${req.file.filename}"', '"${req.file.path}"')`;
    const queryGet = `SELECT id FROM images WHERE name = '"${req.file.filename}"'`;

    connection.query(queryPost, (err, rows) => {
        if (err){
            throw err;
        }else{
            connection.query(queryGet, (err, rows) => {
                if (err) throw err;
                res.json(rows[0]);
            });
        }
    });
});

//PUT

app.put('/project/:id', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    connection.query('UPDATE projects SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
        if (err) throw err;
        res.sendStatus(200).json(rows);
    });
});

app.listen(port, () => {
    console.log(`running at port ${port}`);
});