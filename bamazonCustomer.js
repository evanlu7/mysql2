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
                        var chosenItem;
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].item_id === answer.whichProduct) {
                                chosenItem = results[i].product_name;
                            }
                        }
                        if (chosenItem.price < parseInt(answer.howMany * chosenItem.price)) {
                            connection.query(
                                "UPDATE products ")
                        }

                    })
            })
}




