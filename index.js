const express = require('express')
const {data_extract} = require('tesseract.js')
const upload = require('./upload')
const { createWorker } = require('tesseract.js');

const app = express()
  

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<form action="http://localhost:5000/data" method="POST" enctype="multipart/form-data">
    <input type="file" name="image" />
    <button type="submit">Upload</button>
</form>`);
});

app.post('/data', upload.single('image'), async(req, res) => {
    const image = req.file;
    if(!image){
        res.send(`<!DOCTYPE html>
<form action="/data" method="POST" enctype="multipart/form-data">
    <input type="file" name="image" />
    <button type="submit">Upload</button>
    <script>alert("upload an image file")</script>
</form>`)
    }
    else{
        const worker = await createWorker('eng');
        const { data: { text, pdf } } = await worker.recognize(image);
        const data = ret.data.text
        res.send(data);
    }
})




app.listen(5000,console.log('listening at 5000'))