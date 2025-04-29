const { v4: uuidv4 } = require('uuid');
const guitars = require('./guitarData');

exports.handler = async (event) => {
    const { httpMethod, body } = event;

    try {
        if (httpMethod === 'GET') {
            // Get guitars logic
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(guitars)
            };
        }

        if (httpMethod === 'POST') {
            const newGuitar = JSON.parse(body);
            newGuitar.id = uuidv4();
            guitars.push(newGuitar);

            return {
                statusCode: 201,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newGuitar)
            };
        }

        // Handle unsupported methods
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to process request' })
        };
    }
};