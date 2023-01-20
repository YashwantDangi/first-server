const express = require("express");

// initialization
const app = express();

// appln will now use json format for the data transfer
app.use(express.json());

const port = 8081;

const toDoList = ["Need to learn", "Need to code"];

// http://localhost:8081/todos
app.get("/todos", (req, res) => {
  res.status(200).send(toDoList);
});

app.post("/todos", (req,res) => {
  let newToDoItem = req.body.item;
  toDoList.push(newToDoItem);
  res.status(201).send({
    message: "The to do got added successfully",
  });
});

app.delete("/todos", (req, res) => {
  const itemToDelete = req.body.item;
  toDoList.find((element, index) => {
    if (element === itemToDelete) {
      toDoList.splice(index, 1);
    }
  });
  res.status(201).send({
    message: `Deleted item ${req.body.item}`,
  });
});


// General Cases always should be at the bottom
app.all("/todos", (req, res) => {
  res.status(501).send();
});

app.all("*", (req, res) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Node js server started on ${port}`);
});
