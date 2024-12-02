const axios = require('axios');

const fetchUser = async () => {
    const graphqlEndpoint = 'http://localhost:3000/graphql';
  
    const query = `
        query user($id: ID!) {
            user(id: $id) {
                id
                firstName
                lastName
                email
                items {
                  id
                  itemName
                  description
                  amount
                }
            }
        }
    `;

  const variables = { id: '6745acfd601173feaa294e17' };
  
    try {
      const response = await axios.post(graphqlEndpoint, { query, variables }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      return response.data.data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return [];
    }
};  

fetchUser().then((user) => {
    console.log('Fetched user:', user);
});