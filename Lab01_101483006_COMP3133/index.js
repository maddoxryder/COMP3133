// index.js
// comp3133 lab01: read csv and write filtered canada + usa rows to txt files

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const INPUT_FILE = path.join(__dirname, "input_countries.csv");
const CANADA_FILE = path.join(__dirname, "canada.txt");
const USA_FILE = path.join(__dirname, "usa.txt");

// delete output files if they already exist
function deleteIfExists(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`deleted existing file: ${path.basename(filePath)}`);
        }
    } catch (err) {
        console.error(`could not delete ${filePath}:`, err.message);
    }
}

deleteIfExists(CANADA_FILE);
deleteIfExists(USA_FILE);

// create write streams
const canadaStream = fs.createWriteStream(CANADA_FILE, { flags: "a" });
const usaStream = fs.createWriteStream(USA_FILE, { flags: "a" });

// write headers (matches sample output)
canadaStream.write("country,year,population\n");
usaStream.write("country,year,population\n");

let canadaCount = 0;
let usaCount = 0;

fs.createReadStream(INPUT_FILE)
    .pipe(csv())
    .on("data", (row) => {
        // normalize values safely
        const country = String(row.country ?? "").trim().toLowerCase();
        const year = String(row.year ?? "").trim();
        const population = String(row.population ?? "").trim();

        if (country === "canada") {
            canadaStream.write(`canada,${year},${population}\n`);
            canadaCount++;
        }

        // csv might use "united states" or "united states of america"
        if (country === "united states" || country === "united states of america") {
            usaStream.write(`united states,${year},${population}\n`);
            usaCount++;
        }
    })
    .on("end", () => {
        canadaStream.end();
        usaStream.end();
        console.log("done reading csv.");
        console.log(`wrote ${canadaCount} canada rows to canada.txt`);
        console.log(`wrote ${usaCount} usa rows to usa.txt`);
    })
    .on("error", (err) => {
        console.error("error reading csv:", err.message);
    });
