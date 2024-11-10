const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

app.post('/api/word-frequency', async (req, res) => {
    const { url, topN } = req.body;

    // Spawn a new process to run the Python script
    const pythonProcess = spawn('python', ['word_frequency.py', url, topN]);

    let outputData = '';
    
    // Collect data from the Python script
    pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                // Parse the output data as JSON
                const result = JSON.parse(outputData);

                // Optionally: count the top 10 frequent words (if not already done in Python)
                const topWords = result.slice(0, 10);  // Just in case Python returns more than top 10

                // Send the top 10 words to the frontend
                res.json({ success: true, topWords: topWords });
            } catch (error) {
                console.error('Error parsing Python output:', error);
                res.status(500).json({ success: false, error: 'Failed to parse word frequency data.' });
            }
        } else {
            res.status(500).json({ success: false, error: 'Python script failed to execute.' });
        }
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// // backend/index.js
// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');


// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const PORT = 5000;

// app.post('/api/word-frequency', async (req, res) => {
//     const { url, topN } = req.body;
//     try {
//         // Fetch the HTML content of the URL
//         const response = await axios.get(url);
//         const html = response.data;

//         // Load HTML into cheerio
//         const $ = cheerio.load(html);

//         // Remove all non-visible elements (scripts, styles, and other elements)
//         $('script, style, noscript, iframe, link, meta').remove();

//         // Extract the visible text
//         const mainText = $('body').text()
//             .replace(/\s+/g, ' ') // Remove excess whitespace
//             .trim();

//         console.log("Main Text Content:", mainText);

//          // Tokenize the text and count word frequency
//          const words = mainText.toLowerCase().match(/\b\w+\b/g) || []; // Match words only

//          // Calculate word frequency
//          const frequencyMap = {};
//          words.forEach(word => {
//              frequencyMap[word] = (frequencyMap[word] || 0) + 1;
//          });
 
//          // Sort and get top N words
//          const sortedWords = Object.entries(frequencyMap)
//              .sort((a, b) => b[1] - a[1])
//              .slice(0, topN) 
//              .map(([word, count]) => ({ word, count }));
 
//          res.json({topWords : sortedWords});
//     } catch (error) {
//         console.error("Error fetching URL content:", error);
//     }

//     // try {
//     //     const browser = await puppeteer.launch();
//     //     const page = await browser.newPage();
//     //     await page.goto(url);

//     //     // Extract main visible text content only
//     //     const text = await page.evaluate(() => {
//     //         const bodyText = document.body.innerText || '';
//     //         return bodyText;
//     //     });

//     //     console.log(text);

//     //     await browser.close();

//     //     const words = text.toLowerCase().match(/\b\w+\b/g) || [];
//     //     const frequencyMap = {};
//     //     words.forEach(word => {
//     //         frequencyMap[word] = (frequencyMap[word] || 0) + 1;
//     //     });

//     //     const sortedWords = Object.entries(frequencyMap)
//     //         .sort((a, b) => b[1] - a[1])
//     //         .slice(0, topN)
//     //         .map(([word, count]) => ({ word, count }));

//     //     res.json({topWords : sortedWords});

//     // } catch (error) {
//     //     console.error("Error occurred:", error);
//     //     throw new Error("Failed to fetch and process the URL content.");
//     // }
// });

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







