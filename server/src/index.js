const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
express.static('../src/uploads')
app.use('/images', express.static('../src/uploads'));

const multipartMiddleware = multipart({ uploadDir: '../src/uploads' });

app.post('/upload/', multipartMiddleware, (req, res) => {
  const files = req.files;// files é a variável do angular
  console.log(files);
  res.json({ message: files }); // lista de arquivos enviada de volta
}).get('/upload/:nomedaimagem',(req, res) => {
  return res.send(req.params.nomedaimagem);
}).get('/images', (req,res) => {
  res.status(200);
});



app.use((err, req, res, next) => res.json(
  {error: err.message}));

  app.listen(8000, () => {
    console.log('Servidor iniciado => porta 8000')
    console.log('Endpoint: http://localhost:8000/upload')
  });
