const { v4: uuidv4 } = require('uuid');
const guitars = require('./guitarData');

exports.handler = async (event) => {
    const { httpMethod, body, path } = event;

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

        if (httpMethod === 'DELETE') {
            // Extract the ID from the request body
            const { id } = JSON.parse(body);
            
            if (!id) {
                return {
                    statusCode: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ error: 'Guitar ID is required' })
                };
            }

            const initialLength = guitars.length;
            const guitarIndex = guitars.findIndex(guitar => guitar.id === id);
            
            if (guitarIndex === -1) {
                return {
                    statusCode: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ error: 'Guitar not found' })
                };
            }

            // Remove the guitar from the array
            const deletedGuitar = guitars.splice(guitarIndex, 1)[0];

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    message: 'Guitar deleted successfully',
                    deletedGuitar 
                })
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