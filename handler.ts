module.exports.create = async (event) => {
  console.log('event: ', event)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}

// export {  exclude,  update, getAll, get } from './src/index';