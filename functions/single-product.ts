exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;
  if (id) {
    return {
      statusCode: 200,
      body: "single product",
    };
  }
  return {
    statusCode: 400,
    body: "insira um id válido",
  };
};
