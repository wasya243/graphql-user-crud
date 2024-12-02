const axios = require('axios');

const fetchUsers = async () => {
    const graphqlEndpoint = 'http://localhost:3000/graphql';
  
    const query = `
      query {
        users(page: 0, perPage: 10) {
          users {
            id
            firstName
            lastName
            items {
              id
              itemName
            }
          }
          total
          totalPages
          currentPage
        }
      }
    `;
  
    try {
      const response = await axios.post(graphqlEndpoint, { query }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      return response.data.data.users;
    } catch (error) {
      console.error('Error fetching users:', error.response.data);
      return [];
    }
};  

fetchUsers().then((users) => {
    console.log('Fetched users:', users);
});