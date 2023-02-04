
const twilio = require("twilio");
const jwt = require('jsonwebtoken');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function getCallsByNumber(req, res) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add any logic for validating the user's access to the data
        const response = await client.calls.list({to: number});
        return response;

    } catch (error) {
      console.error(`An error occurred while getting calls by number: ${error}`);
      throw error;
    }
  }
  
  async function getCallById(req, res) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add any logic for validating the user's access to the data
        const response = await client.calls(callSid).fetch();
        return response;

    } catch (error) {
      console.error(`An error occurred while getting call by id: ${error}`);
      throw error;
    }
  }

  async function getAllCalls(req, res) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add any logic for validating the user's access to the data
        const response = await client.calls().fetch();
        return response;
        
    } catch (error) {
      console.error(`An error occurred while getting call by id: ${error}`);
      throw error;
    }
  }
  
  module.exports = {
    getCallsByNumber,
    getCallById,
    getAllCalls
  };