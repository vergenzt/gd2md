var docx4js = require('docx4js');
var express = require('express');
var fs = require('fs');
var google = require('googleapis');
var https = require('https');

var app = express();
var drive = google.drive({
  version: 'v2',
  auth: process.env.GOOGLE_API_KEY,
});

// constants
var DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

// function copied from http://stackoverflow.com/a/17676794/718180
var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

// main handler
app.get('/', function(req, res) {
  var fileId = req.query.fileId;
  if (!fileId) {
    res.sendStatus(400);
  }

  // get drive info
  drive.files.get({ fileId: fileId }, function(err, response) {
    if (err) {
      res.status(400).send(response);
    }

    // download docx
    var url = response.exportLinks[DOCX_MIME];
    var dest = response.id;
    download(url, dest, function(err) {
      if (err) {
        res.status(500).send('Error downloading!');
      }

      // parse docx
      docx4js.load(dest).then(function(doc) {
        res.send(doc);
      });
    });
  });
});

app.listen(3000);

