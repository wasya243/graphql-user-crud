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

function generateUserItem(userId) {
    const itemName = generateRandomString(generateRandomNumber(5, 10));
    const description = generateRandomString(generateRandomNumber(5, 10));
    const amount = generateRandomNumber(5, 10);

    return {
        itemName,
        description,
        amount,
        userId,
    }
}

function generateUserItems(amount, userId) {
    const userItems = [];

    for(let i = 0; i < amount; i++) {
        userItems.push(generateUserItem(userId));
    }

    return userItems;
}

const populate = async () => {
    try {
        const graphqlEndpoint = 'http://localhost:3000/graphql';
        // TODO: use from db existing id
        const userId = '6745acfd601173feaa294e17';
        const userItems = generateUserItems(100, userId);

        for(const userItem of userItems) {
            const mutation = `
                mutation createUserItem($userId: ID!, $itemName: String!, $description: String!, $amount: Int!) {
                    createUserItem(userId: $userId, itemName: $itemName, description: $description, amount: $amount) {
                        userId
                        itemName
                        description
                        amount
                    }
                }
            `;

            const variables = { userId: userItem.userId, itemName: userItem.itemName, description: userItem.description, amount: userItem.amount };

            await axios.post(graphqlEndpoint, { query: mutation, variables });
        }
    } catch (error) {
        console.error('Error creating user items:', error.response.data);
    }
}; 

populate();