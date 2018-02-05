var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}
start();



function start() {
    connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            inquirer
                .prompt([{
                        name: "whichProduct",
                        type: "input",
                        message: "What is the ID of the item you want to buy?",
                    },
                    {
                        name: "howMany",
                        type: "input",
                        message: "How many of the product do you want to buy?",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }
                ])
                .then(function(answer) {
                        // save the total price for later display
                        
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].item_id == answer.whichProduct) {
                                var chosenItem = results[i];
                                }
                                if (results[i].stock_quantity < answer.howMany) {
                                    console.log("Insufficient Quantity!")
                                }

                                if (results[i].stock_quantity > answer.howMany) {
                                var total = parseFloat(((answer.whichProduct*answer.howMany)));     
                                    // set question mark syntax to set variables later.
                                    connection.query("UPDATE products SET ? WHERE ?", [
                                            {stock_quantity:(results[i].stock_quantity - answer.howMany) },
                                            {item_id: results[i].item_id }

                                        ],
                                        function (error) {
                                        if(err) throw err;
                                        console.log("Success! You're total is " + total)
                                    }
                                    )
                            
                        }
                    }

                })
    })
}