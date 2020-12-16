const uuid = require("uuid");
const client = require("../models");
require("dotenv").config();

module.exports = {
  getInventory: async (req, res) => {
    let query = "SELECT * FROM winventory";
    try {
      client.Client.query(query, (err, result) => {
        if (err) console.log(err);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  inputInventory: async (req, res) => {
    let query = "INSERT INTO winventory SET ?";
    try {
      client.Client.query(
        query,
        {
          id: uuid.v4(),
          cname: req.body.cname,
          sname: req.body.sname,
          price: req.body.price,
          quantity: req.body.quantity,
        },
        (err, result) => {
          if (err) console.log(err);
          else{
              client.Client.query("SELECT * FROM winventory", (err1, result1) => {
                  if (err1) console.log(err1)
                  else{
                    res.json({ data: result1 });
                  }
              })
          }
          
        }
      );
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  updateInventory: async (req, res) => {
      let query = "UPDATE winventory SET ? WHERE id = ? "
      try{
          client.Client.query(
              query,
              [{
                  cname: req.body.cname,
                  sname: req.body.sname,
                  price: req.body.price,
                  quantity: req.body.quantity
              }, req.body.id],
              (err, result) => {
                if (err) console.log(err);
                else{
                    client.Client.query("SELECT * FROM winventory", (err1, result1) => {
                        if (err1) console.log(err1)
                        else{
                            res.json({ data: result1 });
                        }
                    })
                }
              }
            );
          } catch (e) {
            console.log(e);
            res.json({ error: e });
          }
        }
};
