
const uuid = require("uuid");
const client = require("../models");
const connection = require("../models/Client");
require("dotenv").config();

const timeStamp = Date.now();
const thedate = new Date(timeStamp);

module.exports = {
  getThisDaySummary: async (req, res) => {
    let query = "SELECT * FROM transactions WHERE transaction_date > ? ORDER BY transaction_date DESC";
    let dayStart = timeStamp - 3600000 * (thedate.getHours()+1);
    try {
      client.Client.query(query, [dayStart], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  getThisMonthSummary: async (req, res) => {
    let query = "SELECT * FROM transactions WHERE transaction_date > ? ORDER BY transaction_date DESC";
    let monthStart = timeStamp - 3600000 * 24 * thedate.getDate();
    try {
      client.Client.query(query, [monthStart], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  
  getDailySummary: async (req, res) => {
    let query =
      "SELECT * FROM transactions WHERE transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC";
    let query1 = "SELECT * FROM sales WHERE date_sold >= ? AND date_sold <= ? ORDER BY date_sold DESC";
    let startDay = req.body.start;
    let endDay = req.body.end;
    try {
      client.Client.query(query, [startDay, endDay], (err, result) => {
        if (err) console.log( err);
        else{
          client.Client.query(query1, [startDay, endDay], (err1, result1) => {
            if (err1) console.log(err1);
            else{
              res.json({ data: [result, result1]});
            }
          })
        }
        
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  getMonthlySummary: async (req, res) => {
    let query =
      "SELECT * FROM transactions WHERE transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC";
    let start = req.body.start;
    let end = req.body.end;
    try {
      client.Client.query(query, [start, end], (err, result) => {
        if (err) console.log( err);
        res.json({ date: result });
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  getClientSummary: async (req, res) => {
    let queryFunction = () => {
      if (!req.body.start && ! req.body.end) {
        return "SELECT * FROM transactions WHERE client_name = ? ORDER BY transaction_date DESC"
      }
      else if (!req.body.start) {
        return "SELECT * FROM transactions WHERE client_name = ? AND transaction_date >= ? ORDER BY transaction_date DESC"
      }
      else if (req.body.start && req.body.end) {
        return "SELECT * FROM transactions WHERE client_name = ? AND transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC";
      }
    }
    
    let start = req.body.start;
    let end = req.body.end
    try {
      client.Client.query(queryFunction(), [req.body.name, start, end], (err, result) => {
        if (err) console.log( err);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  inputTransaction: async (req, res) => {
    let query = "INSERT INTO transactions SET ?";
    try {
      client.Client.query(
        query,
        {
          transaction_id: uuid.v4(),
          transaction_date: req.body.transaction_date,
          client_name: req.body.client_name,
          price: req.body.price,
          quantity: req.body.quantity,
          amount: req.body.amount
        },
        (err, result) => {
          if (err) console.log( err);
          module.exports.inventoryUpdate({date: req.body.transaction_date, quantity: req.body.quantity, amount_spent: req.body.amount})
          res.json({ data: "success" });
        }
      );
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  deleteTransaction: async(req, res) => {
    let query = "DELETE FROM transactions WHERE transaction_id = ?"
    try{
      client.Client.query(query, [req.body.id], (err, result) => {
        if (err) throw err
        module.exports.inventoryUpdate({date: 1, quantity: - req.body.quantity, amount_spent: - req.body.amount})
        res.json({data: "success"})
      })
    }catch(e){
      res.json({error: "bad"})
    }
  },
  inventoryUpdate: async (req) => {
    let query =
      "SELECT * FROM inventory WHERE id=(SELECT max(id) FROM inventory)";
    try {
      client.Client.query(query, (err, result) => {
        if (err) console.log( err);
        else {
          client.Client.query(
            "INSERT INTO inventory SET ?",
            {
              id: parseFloat(result[0].id) + 2,
              quantity: parseFloat(result[0].quantity) + parseFloat(req.quantity),
              amount_spent: parseFloat(result[0].amount_spent) + parseFloat(req.amount_spent),
              date_changed: req.date
            },
            (err1, result1) => {
              if (err1) console.log(err1);
              
            }
          );
        }
      });
    } catch (e) {
      console.log(e);

    }
  },
  mainPageData: async (req, res) => {
    let query1 = "SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT 10";
    let query2 =
      "SELECT * FROM inventory WHERE id=(SELECT max(id) FROM inventory)";
    let query3 = "SELECT * FROM sales"
    try {
      client.Client.query(query1, (err, result) => {
        if (err) console.log( err);
        else {
          client.Client.query(query2, (err1, result1) => {
            if (err1) console.log(err1);
            else {
              client.Client.query(query3, (err2, result2) => {
                if (err2) console.log(err2)
                else{
                  res.json({ data: [result, result1, result2]});
                }
              })
            }
          });
        }
      });
    } catch (e) {
      console.log(e)
      res.json({ error: e });
    }
  },
  salesSummary: async (req, res) => {
    let query = "SELECT * FROM sales ORDER BY date_sold DESC"
    try{
      client.Client.query(query, (err, result) => {
        if (err) console.log( err);
        else{
          res.json({data: result})
        }
        
      })
    }catch(e) {
      res.json({data: e}) 
    }
  },
  insertSales: async (req, res) => {
    let query = "INSERT INTO sales SET ?"
    try{
      client.Client.query(query, {id: uuid.v4(), quantity: req.body.quantity, cash: req.body.amount, date_sold: req.body.timestamp}, (err, result) => {
        if (err) console.log(err);
        else{
          module.exports.inventoryUpdate({date: req.body.timeStamp, quantity: - req.body.quantity, amount_spent: - req.body.amount})
          res.json({data: "success"})
        }
      })
    }catch(e){
      console.log(e)
      res.json({error: "err"})
    }
  },
  deleteSales: async (req, res) => {
    let query = "DELETE FROM sales WHERE id = ?"
    try{
      client.Client.query(query, [req.body.id], (err, result) => {
        if (err) console.log(err); 
        else{
          module.exports.inventoryUpdate({date: 1, quantity: req.body.quantity, amount_spent: req.body.amount})
          res.json({data: "success"})
        }
      })
    }catch(e) {
      res.json({data: "error"})
    }
  },
//   dataTransfer: async(req, res) => {
//     // let query = "select * from transactions"
//     // try{
//     //   client.Client.query(query, (err, result) => {
//     //     result.map((item, index) => {
//     //       module.exports.addToNewList(item, index)
//     //     })
//     //     res.json({message: "done"})
//     //   })
//     // }catch(e){
//     //   console.log(e)
//     // }
//     console.log(timeStamp)
//     res.json({time: timeStamp})
//   },
//   addToNewList: async(data, index) => {
//     try{
//         const query = "INSERT INTO cycle_transaction SET ?";
//         await client.Client.query(
//             query, 
//             {
//                 transaction_id: data.transaction_id,
//                 transaction_date:  data.transaction_date,
//                 client_name: data.client_name,
//                 price: data.price,
//                 quantity: data.quantity,
//                 amount: data.amount,
//                 cycle_id: "m4399355"
//             },
//             (err, result) => {
//                 if(err) console.log(err);
//             }
//         )
//     }catch(e) {
//         if (e) console.log(e);
//     }
// }
};
