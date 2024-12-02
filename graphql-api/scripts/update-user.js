const axios = require('axios');

const updateUser = async () => {
    const graphqlEndpoint = 'http://localhost:3000';
  
    const query = `
        mutation updateUser($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
            updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
                id
                firstName
                lastName
                email
            }
        }
    `;

  const variables = { id: '6745acfd601173feaa294ed9', firstName: 'updated', lastName: 'updated', email: 'updated@gmail.com' };
  
    try {
      const response = await axios.post(graphqlEndpoint, { query, variables }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      return response.data.data.updateUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return [];
    }
};  

updateUser().then((user) => {
    console.log('Updated user:', user);
});