const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const { spawnSync } = require('child_process');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//per far vedere il sito useremo la get

app.post('/', (req, res) => { //chiamata quando viene fatta richiesta post


    console.log(req.body) //nel body i parametri della richiesta

    //ci sarà esegui client
    var spawn = require('child_process').spawn;
    // Create a child process
    var child = spawn('./client' , ["-s", req.body.serverIp, "-m", req.body.pNum]);//per passare parametri

    child.stdout.on('data',
        function (data) {
            console.log('client command output: ' + data);
        });
    child.stderr.on('data', function (data) {
        //throw errors
        console.log('latenza: ' + data.slice(",")[0]);

    });

    child.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });



    
    res.status(200).send();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//axios.post("urlAPI", body)



