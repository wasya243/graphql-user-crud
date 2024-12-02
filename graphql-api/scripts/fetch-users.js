const axios = require('axios');

const fetchUsers = async () => {
    const graphqlEndpoint = 'http://localhost:3000';
  
    const query = `
      query {
        getUsers {
          id
          firstName
          lastName
        }
      }
    `;
  
    try {
      const response = await axios.post(graphqlEndpoint, { query }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      return response.data.data.getUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
};  

fetchUsers().then((users) => {
    console.log('Fetched users:', users);
});