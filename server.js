// server creation

const http = require("http");

const port = 8081;

const toDoList = ["Need to learn", "Need to code"];

// http Methods

// GET => getting certain details from server / default method / and it can directly work with any browser.
// PUT => overwrite, fully update.
// DELETE => deleting data from server.
// PATCH => update very few files / certain files.
// POST => sending to the server (like:- Login Credentials).

http
  .createServer((req, res) => {
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<h1>Hello, Yashwant Singh Dangi new server</h1>");
    // res.end();
    const { method, url } = req;
    // console.log(method, url);
    // res.end();
    if (url === "/todos") {
      // http://localhost:8081/todos
      if (method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(toDoList.toString());
      } else if (method === "POST") {
        let body = "";
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(chunk);
          })
          .on("end", () => {
            body = JSON.parse(body);
            // console.log("body data " , body);
            let newToDo = toDoList;
            newToDo.push(body.item);
            console.log(newToDo);
            res.writeHead(201);
          });
      } else if (method === "DELETE") {
        let body = "";
        req
          .on("error", (err) => {
            console.error(err);
          })
          .on("data", (chunk) => {
            body += chunk;
          })
          .on("end", () => {
            body = JSON.parse(body);
            let deleteItem = body.item;
            for (let i = 0; i < toDoList.length; i++) {
              if (toDoList[i] === deleteItem) {
                toDoList.splice(i, 1);
                break;
              }
            }
            res.writeHead(204);
          });
      } else {
        res.writeHead(501);
      }
    } else {
      res.writeHead(404);
    }
    res.end();
  })
  .listen(port, () => {
    console.log(`My NodeJs server started on port ${port}`);
  });

// Different routes (url) ->

// To run server : http://localhost:8081
// http://localhost:8081/
// http://localhost:8081/home/
// http://localhost:8081/aboutUs/
// http://localhost:8081/contactUs/
