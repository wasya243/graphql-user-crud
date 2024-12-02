const axios = require('axios');

const deleteUser = async () => {
    const graphqlEndpoint = 'http://localhost:3000/graphql';
  
    const query = `
        mutation deleteUser($id: ID!) {
            deleteUser(id: $id) {
                id
            }
        }
    `;

  const variables = { id: '6745acfd601173feaa294e35' };
  
    try {
      const response = await axios.post(graphqlEndpoint, { query, variables }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      return response.data.data.deleteUser;
    } catch (error) {
      console.error('Error deleting user:', error);
    }
};  

deleteUser().then((user) => {
    console.log('Deleted user:', user);
});