import fs from "fs";
import im from "imagemagick";

// config
const pathIn = "./data";
const pathOut = "./data_resized";
const width = 250;

if (!fs.existsSync(pathOut)) fs.mkdirSync(pathOut);

const files = fs.readdirSync(pathIn);
files.forEach((file) => {
  im.resize(
    {
      srcData: fs.readFileSync(`${pathIn}/${file}`, "binary"),
      width: width,
    },
    (err, stdout, stderr) => {
      if (err) console.log(err);
      else {
        fs.writeFileSync(`${pathOut}/${file}`, stdout, "binary");
        console.log(`'${file}' ready!`);
      }
    }
  );
});
