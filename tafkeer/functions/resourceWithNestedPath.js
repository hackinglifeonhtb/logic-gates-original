exports.handler = async (event, context) => {
    const pathParts = event.path.split('/').filter(Boolean);
    const [resource, id, nestedResource, nestedId] = pathParts;
  
    // Fetch data based on the provided resource, id, nestedResource, and nestedId
    const data = {
      resource,
      id,
      nestedResource,
      nestedId,
      // Add more data as needed
    };
  
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  };