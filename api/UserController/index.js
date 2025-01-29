const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  console.log(JSON.stringify(event));

  try {
    switch (event.routeKey) {
      case "POST /items":
        console.log(event);

        let requestJSON = JSON.parse(event.body);
        console.log(event.body);
        //Get the current auto increment value
        
        const AuthUser = await dynamo
          .get({
            TableName: "Users",
            Key: {
              username: requestJSON.username
            }
          }).promise();

        if (AuthUser.Item) {
          body = AuthUser;
        } else {
          body = { message: 'Invalid credentials' };
          statusCode = 401;
        }
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
