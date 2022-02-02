// get the client
const mysql = require("mysql2"); //mmysql2 is a wrapper for the mysql module
// create the connection to database..bridge for info...now we can send info back and forth
const connection = mysql.createConnection({
  //ADD IN CREDENTIALS
});

//1st query
// const query = "SELECT * FROM Products";

// connection.query(query, (err, results, fields) => {//execute this query..omce your are done execute function.  A call back
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });

//where we do connection.promise below... we are changing from a callback to a promise.  the query in promise format returns an array. The .promise() with query method with mySql2 returns an array of two elements [row, column] RTFM.  1st element of array assigned to result.  Second assigned to Fields.  Below we return results, the array with 1 object in it [{Id: 1, Description: 'Iphone 13', SKU: 'SKU123', UserId: null}]

const getAllProducts = async () => {
  const query = "SELECT * FROM Products";
  const [results, fields] = await connection.promise().query(query);
  console.log(results);
  return results;
};

//create a method with async to add in new product.  Make reusable so we can make more products easier later.  Must
const createProduct = async (product) => {
  const insertQuery = `INSERT INTO Products (Description, SKU, UserId)
    VALUES ("${product.Description}", "${product.SKU}", ${product.UserId} )`; //Quotes arround our String values so that SQL can read and understand.  Not needed on User Id because it is an integer.

  const [results, fields] = await connection.promise().query(insertQuery);
  console.log(results);

  return results;
};

getAllProducts();

// createProduct({
//   Description: "Do we need the quotes? yes",
//   SKU: "test check",
//   UserId: 1,
// });

connection.end(); //closes the lane for you.  Avoid memory leaks *********
