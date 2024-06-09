const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body, AutoIncrementKey;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  console.log(JSON.stringify(event));

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            TableName: "ContactUsRequest",
            Key: {
              itemId: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /items/{id}":
        body = await dynamo
          .get({
            TableName: "ContactUsRequest",
            Key: {
              itemId: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /items":
        body = await dynamo.scan({ TableName: "ContactUsRequest" }).promise();
        break;
      case "POST /items":

        let mejsonobj;
        let requestJSON = JSON.parse(event.body);
        let NewAutoIncrementNum;

        //Get the current auto increment value
        AutoIncrementKey = await dynamo
          .get({
            TableName: "AutoIncrementKey",
            Key: {
              IncrementTableName: "ContactUsRequest"
            }
          }).promise();
        NewAutoIncrementNum = AutoIncrementKey.Item.AutoIncrementNum + 1;

        //Save the contact request
        await dynamo
          .put({
            TableName: "ContactUsRequest",
            Item: {
              cus_Id: NewAutoIncrementNum,
              name: requestJSON.name,
              Email: requestJSON.email,   
              Message: requestJSON.message
            }
          }).promise();

        //Update the auto increment key
        await dynamo
          .put({
            TableName: "AutoIncrementKey",
            Item: {
              IncrementTableName: "ContactUsRequest",
              AutoIncrementNum: NewAutoIncrementNum
            }
          }).promise();
        body = `ContactUsRequest sent`;
        break;
      case "OPTIONS /items":
        break;
      case "OPTIONS /items/{id}":
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
