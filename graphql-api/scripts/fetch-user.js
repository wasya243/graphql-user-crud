const axios = require('axios');

const fetchUser = async () => {
    const graphqlEndpoint = 'http://localhost:3000';
  
    const query = `
        query getUser($id: ID!) {
            getUser(id: $id) {
                id
                firstName
                lastName
                email
            }
        }
    `;

  const variables = { id: '6745acfd601173feaa294ed9' };
  
    try {
      const response = await axios.post(graphqlEndpoint, { query, variables }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      return response.data.data.getUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      return [];
    }
};  

fetchUser().then((user) => {
    console.log('Fetched user:', user);
});