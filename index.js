const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/edit.html'));
});

app.post('/pushdata', function (req, res) {
  var j = req.body
  var data = [j.roomNumber, j.patient, j.provider, j.rn, j.status, j.admit, j.target, j.los, j.elos, j.ryg, j.dcby11, j.dcplan, j.barrier1, j.barrier2, j.readmissionrisk, j.tele];
  fs.readFile('files/test.json', (err, data) => {
    if (err) throw err;
    var jsondata = JSON.parse(data);
    var y = `r${j.roomNumber-1}`
    jsondata[0][y].patient = j.patient;
    jsondata[0][y].provider = j.provider;
    jsondata[0][y].rn = j.rn;
    jsondata[0][y].status = j.status;
    jsondata[0][y].admit = j.admit;
    jsondata[0][y].target = j.target;
    jsondata[0][y].los = j.los;
    jsondata[0][y].elos = j.elos;
    var rygoptions = j.ryg.toLowerCase();
    var dcby11options = j.dcby11.toLowerCase();
    var readmissionrisk = j.readmissionrisk.toLowerCase();
    var teleoptions = j.tele.toLowerCase();
    jsondata[0][y].dcby11 = j.dcby11;
    jsondata[0][y].dcplan = j.dcplan;
    jsondata[0][y].barrier1 = j.barrier1;
    jsondata[0][y].barrier2 = j.barrier2;
    jsondata[0][y].readmissionrisk = j.readmissionrisk;
    jsondata[0][y].tele = j.tele;
    if(rygoptions == 'r') {jsondata[0][y].ryg = '🔴'}
    if(rygoptions == 'y') {jsondata[0][y].ryg = '🟡'}
    if(rygoptions == 'g') {jsondata[0][y].ryg = '🟢'}
    if(rygoptions == '-') {jsondata[0][y].ryg = '⚪'}
    if(dcby11options == 'n') {jsondata[0][y].dcby11 = '❌'}
    if(dcby11options == 'y') {jsondata[0][y].dcby11 = '✔️'}
    if(dcby11options == '-') {jsondata[0][y].dcby11 = '-'}
    if(readmissionrisk == 'n') {jsondata[0][y].readmissionrisk = '❌'}
    if(readmissionrisk == 'y') {jsondata[0][y].readmissionrisk = '✔️'}
    if(readmissionrisk == 'h') {jsondata[0][y].readmissionrisk = '❗️'}
    if(readmissionrisk == '-') {jsondata[0][y].readmissionrisk = '-'}
    if(teleoptions == 'n') {jsondata[0][y].tele = '❌'}
    if(teleoptions == 'y') {jsondata[0][y].tele = '✔️'}
    if(teleoptions == '-') {jsondata[0][y].tele = '-'}
    
    newdata = JSON.stringify(jsondata)
    fs.writeFile('files/test.json', newdata, (err) => {
    if (err) throw err;
    res.redirect('/edit');
  });
  });
})

// router.get('/restoredata',function(req,res){
//   fs.readFile('files/test.json', (err, data) => {
//     if (err) throw err;
//     var jsondata = JSON.parse(data);
//     for (i=0; i<21; i++) {
//       var y = `r${i}`
//       jsondata[0][y].patient = '-'
//       jsondata[0][y].provider = '-'
//       jsondata[0][y].rn = '-'
//       jsondata[0][y].status = '-'
//       jsondata[0][y].admit = '-'
//       jsondata[0][y].target = '-'
//       jsondata[0][y].los = '-'
//       jsondata[0][y].elos = '-'
//       var rygoptions = '-'
//       jsondata[0][y].dcby11 = '-'
//       jsondata[0][y].dcplan = '-'
//       jsondata[0][y].barrier1 = '-'
//       jsondata[0][y].barrier2 = '-'
//       jsondata[0][y].readmissionrisk = '-'
//       jsondata[0][y].tele = '-'
//       if(rygoptions == 'r') {jsondata[0][y].ryg = '🔴'}
//       if(rygoptions == 'y') {jsondata[0][y].ryg = '🟡'}
//       if(rygoptions == 'g') {jsondata[0][y].ryg = '🟢'}
//       if(rygoptions == '-') {jsondata[0][y].ryg = '⚪'}
//     }

//     newdata = JSON.stringify(jsondata)
//     fs.writeFile('files/test.json', newdata, (err) => {
//     if (err) throw err;
//     res.redirect('/edit');
//   });
//   });
// })
              
router.get('/test',function(req,res){
  res.sendFile(path.join(__dirname+'/test.html'));
});

app.use('/', router);
app.listen(process.env.port || 3000);
app.use(express.static(__dirname + '/'));

console.log('Running at Port 3000');  