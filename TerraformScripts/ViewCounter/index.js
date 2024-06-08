const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body, ViewCounter, NewViewCounter;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  console.log(JSON.stringify(event));

  try {
    switch (event.routeKey) {
      case "GET /items":
        //Get the current auto increment value
        ViewCounter = await dynamo
          .get({
            TableName: "AutoIncrementKey",
            Key: {
              IncrementTableName: "ViewCounter"
            }
          }).promise();
        NewViewCounter = ViewCounter.Item.AutoIncrementNum + 1;

        //Update the auto increment key
        await dynamo
          .put({
            TableName: "AutoIncrementKey",
            Item: {
              IncrementTableName: "ViewCounter",
              AutoIncrementNum: NewViewCounter
            }
          }).promise();
        body = {
          view_counter: NewViewCounter
        };
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
