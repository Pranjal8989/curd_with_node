const http = require("http");
const users = require("../userData");

const getUser = (req, res) => {
  // set the status code, and content-type
  res.writeHead(200, { "Content-Type": "application/json" });
  // send the data
  res.end(JSON.stringify(users));
};
const getUserById = (req, res) => {
  // set the status code, and content-type
  res.writeHead(200, { "Content-Type": "application/json" });
  // send the data

  let temp = users.find((item) => {
    return item.id == req.params.id;
  });

  res.end(JSON.stringify(temp));
};
const updateUser = (req, res) => {
  const index = users.findIndex((item) => item.id === parseInt(req.params.id));
  if (index !== -1) {
    const updatedUser = {
      ...users[index],
      ...req.body
    };
    users[index] = updatedUser;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedUser));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
  }
};
const deleteUser =(req ,res) => {
let index = users.findIndex((item)=> item.id === parseInt(req.params.id) );
if(index != -1){
  const del = users.splice(index ,1)[0];
  res.status(200).json(del);
} else {
  res.status(404).json({ message: "User not found" });
}
};
const createUser = (req,res) => {
  let newindex = users.length +1;
  const newuser = {
    "id" : newindex,
    ...req.body
  };
users.push(newuser);
res.status(200).json(newuser);
}
module.exports = {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  createUser
};
