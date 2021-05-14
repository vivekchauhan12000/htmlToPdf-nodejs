const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/pdf", async (req, res) => {
    const url = req.query.target;

    const browser = await puppeteer.launch({
        headless: true
    });

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });
    
    const pdf = await webPage.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
})

app.listen(8080, () => {
    console.log("Server started");
});