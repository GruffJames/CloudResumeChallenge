const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body, meal, mealsList;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  console.log(JSON.stringify(event));

  try {
    switch (event.routeKey) {
      case "GET /meals/{id}":
      //Get the current auto increment value
        meal = await dynamo
          .get({
            TableName: "meals",
            Key: {
              _id: parseInt(event.pathParameters.id)
            }
        }).promise();
        body = meal.Item;
        break;
      case "GET /meals":
        //Get the current auto increment value
        mealsList = await dynamo
        .scan({
          TableName: "meals"
        }).promise();
        body = mealsList.Items;
        break;
      case "OPTIONS /items":
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
