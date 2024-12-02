const axios = require('axios');

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }
  
    return result;
}

function generateUser() {
    const firstName = generateRandomString(generateRandomNumber(5, 10));
    const lastName = generateRandomString(generateRandomNumber(5, 10));
    const email = `${generateRandomString(5, 10)}@gmail.com`;

    return {
        firstName,
        lastName,
        email,
    }
}

function generateUsers(numberOfUsers) {
    const users = [];

    for(let i = 0; i < numberOfUsers; i++) {
        users.push(generateUser());
    }

    return users;
}

const populate = async () => {
    try {
        const graphqlEndpoint = 'http://localhost:3000/graphql';
        const users = generateUsers(100);

        for(const user of users) {
            const mutation = `
                mutation createUser($firstName: String!, $lastName: String!, $email: String!) {
                    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
                        firstName
                        lastName
                        email
                    }
                }
            `;
            const variables = { firstName: user.firstName, lastName: user.lastName, email: user.email };

            await axios.post(graphqlEndpoint, { query: mutation, variables });
        }
    } catch (error) {
        console.error('Error creating users:', error);
    }
}; 

populate();