/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB();

const tableName = process.env.USERTABLE;

exports.handler = async event => {
  if (!event?.request?.userAttributes?.sub) {
    console.log('No sub provided!');
    return;
  }

  const now = new Date();
  const timestamp = now.getTime();

  const userItem = {
    id: {S: event.request.userAttributes.sub},
    _typename: {S: 'User'},
    _lastChangedAt: {N: timestamp.toString()},
    _version: {N: '1'},
    updatedAt: {S: now.toISOString()},
    createdAt: {S: now.toISOString()},
    name: {S: event.request.userAttributes.email},
  };

  const params = {
    Item: userItem,
    TableName: tableName,
  };

  try {
    await DynamoDB.putItem(params).promise();
    console.log('success');
  } catch (e) {
    console.log(e);
  }
};
