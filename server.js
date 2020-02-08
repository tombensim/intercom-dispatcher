const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

/* 
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into a conversation composer, Messenger home settings or User Message.
  Params sent from Intercom contains for example `card_creation` parameter that was formed by your `configure` response.
*/
app.post("/initialize", (request, response) => {
  const body = request.body;
  response.send({
    canvas: {
      content: {
        components: [
          {
            type: "button",
            label: "Click ME Sheet!!!!",
            style: "primary",
            id: "url_button",
            action: {
              type: "sheet",
              url: "https://equinox-handsaw-zqpqwd9ff.glitch.me/sheet"
            }
          },
          {
            type: "button",
            label: "Click ME Sheet!!!!",
            style: "primary",
            id: "submit_button",
            action: { type: "submit" }
          }
        ]
      }
    }
  });
}); /* INSERT CODE HERE */

app.post("/sheet", (request, response) => {
  const body = request.body;
  console.log(JSON.stringify(request.body));
  response.sendFile(__dirname + "/views/index-sheet.html");
}); /* INSERT CODE HERE */

app.post("/submit", (request, response) => {
  const body = request.body;
  console.log(JSON.stringify(request.body));
  response.send({
    canvas: {
      content: {
        components: [
          {
            type: "button",
            label: "submitted!!!!",
            style: "primary",
            id: "submitted-button",
            action: {
              type: "submit"
            }
          }
        ]
      }
    }
  });
}); /* INSERT CODE HERE */
