const axios = require("axios");

const API_KEY = process.env.FMP_API_KEY;

async function testFMP() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const url = `https://financialmodelingprep.com/stable/economic-calendar?from=${today}&to=${today}&apikey=${API_KEY}`;

    const { data } = await axios.get(url);

    console.log("✅ Connected to Financial Modeling Prep API");
    console.log(`📅 Events Found: ${Array.isArray(data) ? data.length : 0}`);

    return data;
  } catch (err) {
    console.error("❌ FMP Connection Failed");
    console.error(err.response?.data || err.message);
    return [];
  }
}

module.exports = {
  testFMP,
};
