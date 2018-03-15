#! /usr/bin/env node

// External libraries
const axios = require('axios');

// Check we have an API key and an image URL!
const apiKey = process.env.CLARIFAI_KEY;
if (apiKey === undefined) throw Error("Provide a valid API key for Clarifai. See https://www.clarifai.com/developer/guide/authentication#authentication.")
const imageURL = process.argv[2];
if (imageURL === undefined) throw Error("Provide a valid image URL!");

// Construct our POST request and send!
const endpointURL = 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs'; // general model for classification
const data = { inputs: [ { data: { image: { url: imageURL } } } ] }; // our POST body
const options = { headers: {
  Authorization: 'Key ' + apiKey
} };

axios.post(endpointURL, data, options).then(response => {
  console.log(response.data.outputs[0].data.concepts.splice(0, 10).map(x => x.name))
});
