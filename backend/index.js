const express = require("express");
const multer = require("multer");
const app = express();
const port = 8000;
const cors = require("cors");
const fs = require("fs");
const PDFParser = require("pdf2json");

// npm init
// npm i express cors nodemon
// they add a handy req.body object to our req,
// containing a Javascript
//  object representing the payload sent with the request

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    array = req.files;
    return res.status(200).send(req.files);
  });
});

app.post("/tojson", (req, res) => {
  console.log(req, res);
  fs.writeFileSync("pdf.json", JSON.stringify(req));
});

let word = [];
let words = [];

app.get("/converter", cors(), async (req, res) => {
  await Promise.all(
    array.map(async (unit) => {
      // Set up the pdf parser
      let pdfParser = new PDFParser(this, 1);

      //res.send(unit.filename)

      arr1 =
        "C:/Users/Ryanka Ray/Documents/Headstarters/react-resume-dashboard/backend/public/";

      const a = arr1.concat(unit.filename);

      //res.send(a)

      pdfParser.loadPDF(a);

      // Load the pdf document
      //pdfParser.loadPDF(`public/${unit.filename}`);
      //pdfParser.loadPDF('C:/Users/Ryanka Ray/Downloads/R_Ray_Summer_2022_Resume.pdf');

      // Parsed the patient
      let doc = await new Promise(async (req, res) => {
        // On data ready
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          // The raw PDF data in text form
          const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ", "");
          //console.log(raw);

          req({
            //word: / \s(.*?) /i.exec(raw)[1].trim()
            //word:i.exec(raw)[1].trim()
            word: raw,
          });

          var words2 = raw.split(" ");

          const arrFiltered = words2.filter((el) => {
            return el != null && el != "";
          });

          words = words.concat(arrFiltered);
        });
      });

      //words.push(word);
    })
  );

  //arr2 = 'C:/Users/Ryanka Ray/Documents/Headstarters/new_Project_1/'

  //fs.writeFileSync("pdf.json", JSON.stringify(words));
  res.send(JSON.stringify(words));
});

app.get("/", cors(), async (req, res) => {
  res.send("This is working");
});
app.get("/home", cors(), async (req, res) => {
  res.send("This is the data for the home page");
});

app.post("/post_name", async (req, res) => {
  let { name } = req.body;
  console.log(name);
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
