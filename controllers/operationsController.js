const uuid = require("uuid");
const client = require("../models");
require("dotenv").config();

const timeStamp = Date.now();
const thedate = new Date(timeStamp);

module.exports = {
  getThisDaySummary: async (req, res) => {
    let query =
      "SELECT * FROM cycle_transaction WHERE transaction_date > ? ORDER BY transaction_date DESC";
    let dayStart = timeStamp - 3600000 * (thedate.getHours() + 1);
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
    let query =
      "SELECT * FROM cycle_transaction WHERE transaction_date > ? ORDER BY transaction_date DESC";
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
      "SELECT * FROM cycle_transaction WHERE transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC";
    let query1 =
      "SELECT * FROM sales WHERE date_sold >= ? AND date_sold <= ? ORDER BY date_sold DESC";
    let startDay = req.body.start;
    let endDay = req.body.end;
    try {
      client.Client.query(query, [startDay, endDay], (err, result) => {
        if (err) console.log(err);
        else {
          client.Client.query(query1, [startDay, endDay], (err1, result1) => {
            if (err1) console.log(err1);
            else {
              res.json({ data: [result, result1] });
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  getMonthlySummary: async (req, res) => {
    let query =
      "SELECT * FROM cycle_transaction WHERE transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC";
    let start = req.body.start;
    let end = req.body.end;
    try {
      client.Client.query(query, [start, end], (err, result) => {
        if (err) console.log(err);
        res.json({ date: result });
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  getClientSummary: async (req, res) => {
    let queryFunction = () => {
      if (!req.body.start && !req.body.end) {
        return "SELECT * FROM cycle_transaction WHERE client_name = ? ORDER BY transaction_date DESC";
      } else if (!req.body.start) {
        return "SELECT * FROM cycle_transaction WHERE client_name = ? AND transaction_date >= ? ORDER BY transaction_date DESC";
      } else if (req.body.start && req.body.end) {
        return "SELECT * FROM cycle_transaction WHERE client_name = ? AND transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC";
      }
    };

    let start = req.body.start;
    let end = req.body.end;
    try {
      client.Client.query(
        queryFunction(),
        [req.body.name, start, end],
        (err, result) => {
          if (err) console.log(err);
          res.json({ data: result });
        }
      );
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  inputTransaction: async (req, res) => {
    let query = "SELECT * FROM cycles WHERE end_date = ?"
    let query1 = "INSERT INTO cycle_transaction SET ?";

    try {
      client.Client.query(query, 0, (error, results) => {
        if (error) console.log(error);
        else {
          client.Client.query(
            query1,
            {
              transaction_id: uuid.v4(),
              transaction_date: req.body.transaction_date,
              client_name: req.body.client_name,
              price: req.body.price,
              quantity: req.body.quantity,
              amount: req.body.amount,
              cycle_id: results[0].id,
            },
            (err, result) => {
              if (err) console.log(err);
              module.exports.inventoryUpdate(
                {
                  id: results[0].id,
                  quantity: req.body.quantity,
                  amount_spent: req.body.amount,
                },
                0
              );
              res.json({ data: "success" });
            }
          );
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  },
  deleteTransaction: async (req, res) => {
    let query = "DELETE FROM cycle_transaction WHERE transaction_id = ?";
    try {
      client.Client.query(query, [req.body.transaction_id], (err, result) => {
        if (err) throw err;
        module.exports.inventoryUpdate(
          { quantity: -(req.body.quantity), amount_spent: -(req.body.amount) },
          1
        );
        module.exports.saveDeleted(req.body)
        res.json({ data: "success" });
      });
    } catch (e) {
      res.json({ error: "bad" });
    }
  },
  inventoryUpdate: async (req, type) => {
    let query = "SELECT * from cycles where end_date = ?";
    try {
      client.Client.query(query, 0, (err, result) => {
        if (err) console.log(err);
        else {
          if (type === 0 || type === 1) {
            client.Client.query(
              "update cycles set ? where end_date = ?",
              [
                {
                  quantity:
                    parseFloat(result[0].quantity) + parseFloat(req.quantity),
                  amount_spent:
                    parseFloat(result[0].amount_spent) +
                    parseFloat(req.amount_spent),
                },
                0,
              ],
              (err1, result1) => {
                if (err1) console.log(err1);
              }
            );
          } else if (type === 2) {
            client.Client.query(
              "update cycles set ? where end_date = ?",
              [
                {
                  sales_quantity: req.quantity,
                  sales_amount: req.amount_spent,
                  end_date: req.date + 1,
                },
                0,
              ],
              (err1, result1) => {
                if (err1) console.log(err1);
                else {
                  client.Client.query(
                    "insert into cycles set ?",
                    {
                      id: uuid.v4(),
                      quantity:
                        parseFloat(result[0].quantity) -
                        parseFloat(req.quantity),
                      amount_spent: 0,
                      start_date: req.date + 1,
                      end_date: 0,
                      cycle_number: result[0].cycle_number + 1,
                    },
                    (err2, result2) => {
                      if (err2) console.log(err2);
                    }
                  );
                }
              }
            );
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  mainPageData: async (req, res) => {
    let query1 =
      "SELECT * FROM cycle_transaction WHERE transaction_date >= ? ORDER BY transaction_date DESC";
    let query2 = "SELECT * FROM cycles WHERE end_date = ?";
    let query3 = "SELECT * FROM sales";
    try {
      client.Client.query(query2, 0, (err, result) => {
        if (err) console.log(err);
        else {
          client.Client.query(query1, result[0].start_date, (err1, result1) => {
            if (err1) console.log(err1);
            else {
              client.Client.query(query3, (err2, result2) => {
                if (err2) console.log(err2);
                else {
                  res.json({ data: [result, result1, result2] });
                }
              });
            }
          });
        }
      });
    } catch (e) {
      res.json({ error: e });
    }
  },
  salesSummary: async (req, res) => {
    let query = "SELECT * FROM sales ORDER BY date_sold DESC";
    try {
      client.Client.query(query, (err, result) => {
        if (err) console.log(err);
        else {
          res.json({ data: result });
        }
      });
    } catch (e) {
      res.json({ data: e });
    }
  },
  insertSales: async (req, res) => {
    let query = "INSERT INTO sales SET ?";
    let query1 = "SELECT * FROM cycles WHERE end_date = ?";
    try {
      client.Client.query(query1, 0, (err1, result1) => {
        if (err1) console.log(err1);
        else {
          client.Client.query(
            query,
            {
              id: uuid.v4(),
              quantity_sold: req.body.quantity,
              cash: req.body.amount,
              date_sold: req.body.timestamp,
              cycle_id: result1[0].id,
            },
            (err, result) => {
              if (err) console.log(err);
              else {
                module.exports.inventoryUpdate(
                  {
                    quantity: req.body.quantity,
                    amount_spent: req.body.amount,
                    date: req.body.timestamp,
                  },
                  2
                );
                res.json({ data: "success" });
              }
            }
          );
        }
      });
    } catch (e) {
      res.json({ error: "err" });
    }
  },
  dataTransfer: async (req, res) => {
    let query = "update cycles set ? where id = ?";
    try {
      client.Client.query(
        query,
        [{ end_date: 0, sales_quantity: 0, cycle_number: 1 }, "m4399355"],
        (err, result) => {
          console.log(result);
          res.json({ message: "done" });
        }
      );
    } catch (e) {
      res.json({ error: e });
    }
  },
  getCurrentCycle: async (req, res) => {
    let query = "SELECT * FROM cycles WHERE end_date = ?";
    try {
      client.Client.query(query, 0, (err, result) => {
        if (err) console.log(err);
        else {
          client.Client.query(
            "select * from cycle_transaction where transaction_date >= ? ORDER BY transaction_date DESC",
            result[0].start_date,
            (err1, result1) => {
              if (err1) console.log(err1);
              else {
                res.json({ data: result1 });
              }
            }
          );
        }
      });
    } catch (e) {
      res.json({ error: e });
    }
  },
  getCycle: async (req, res) => {
    try {
      client.Client.query(
        "SELECT * FROM cycle_transaction LEFT JOIN sales ON cycle_transaction.cycle_id = sales.cycle_id WHERE cycle_transaction.transaction_date >= ? AND cycle_transaction.transaction_date<= ? ORDER BY cycle_transaction.transaction_date DESC",
        [req.body.start_date, req.body.end_date],
        (err1, result1) => {
          if (err1) console.log(err1);
          else {
            res.json({ data: result1 });
          }
        }
      );
    } catch (e) {

      res.json({ error: e });
    }
  },
  getAllCycle: async (req, res) => {
    let query = "SELECT * FROM cycles";
    try {
      client.Client.query(query, (err, result) => {
        if (err) console.log(err);
        res.json({ data: result });
      });
    } catch (e) {

      res.json({ error: e });
    }
  },
  editSales: async (req, res) => {
    let query1 = "UPDATE cycles SET ? WHERE id = ?";
    let query2 = "UPDATE sales SET ? WHERE cycle_id = ?";
    try {
      client.Client.query(
        query1,
        [{ sales_amount: req.body.amount }, req.body.id],
        (err, result) => {
          if (err) console.log(err);
          else {
            client.Client.query(
              query2,
              [{ cash: req.body.amount }, req.body.id],
              (err1, result1) => {
                if (err1) console.log(err1);
                else {
                  res.json({ data: "done" });
                }
              }
            );
          }
        }
      );
    } catch (e) {

      res.json({ error: e });
    }
  },
  getClients: async (req, res) => {
    let query = "SELECT * FROM clients"
    client.Client.query(query, (err, result) => {
      if (err) console.log(err);
      else{
        res.json({data: result})
      }
    })
  },
  insertClient: async (req, res) => {
    let query = "INSERT INTO clients SET ?"
    client.Client.query(query, {client_name: req.body.client_name}, (err, result) => {
      if (err) console.log(err);
      else{
        res.json({data: "success"})
      }
    })
  },
  getClientLatestPrice: async (req, res) => {
    let query = "SELECT MAX(transaction_date), price FROM cycle_transaction WHERE client_name = ?"
    try{
      client.Client.query(query, [req.body.client], (error, result) => {
      if (error) throw error;
      else{
        res.json({data: result[0].price})
      }
      })
    }catch(error){
      res.json({error: error})
    }
    
  },
  saveDeleted: async(data) => {
    let query = "INSERT INTO deleted SET ?"
    console.log(data)
    try{
      client.Client.query(query, data, (err, results) => {
        if (err) throw err
        else{
          console.log("success")
        }
      })
    }catch(error){
      console.log(error)
    }
  },
  getDeleted: async(req, res)=> {
    let query = "SELECT * FROM deleted WHERE transaction_date >= ?"
    try{
      client.Client.query(query, [req.body.date], (err, result) => {
        if (err) throw err;
        else{
          res.json({data: result})
        }
      })
    }catch(error) {
      console.log(error)
    }
  },
  restoreDeleted: async(req, res) => {
    let query = "DELETE FROM deleted WHERE transaction_id = ?"
    let query1 = "INSERT INTO cycle_transaction SET ?"
    try{
      client.Client.query(query, [req.body.transaction_id], (err, result) => {
        if (err) throw err;
        else{
          client.Client.query(query1, req.body, (err, result) => {
            if (err) console.log(err)
            else{
              res.json({success: true})
              module.exports.inventoryUpdate(
                {
                  quantity: req.body.quantity,
                  amount_spent: req.body.amount
                },
                0
              )
            }
          })
        }
      })
    }catch(error) {
      console.log(error)
    }
  }
};
