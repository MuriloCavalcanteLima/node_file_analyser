var express = require('express');
var cors = require('cors');
const multer = require('multer');
const path = require('path');

const removeUploadedFiles = require('multer/lib/remove-uploaded-files');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if(!req.file) res.status(400).json({message: 'file not uploaded'})

  res.json({
    "name": req.file.filename,
    "type": req.file.mimetype,
    "size": req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
