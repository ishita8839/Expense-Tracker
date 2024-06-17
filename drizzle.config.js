require('dotenv').config();


/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Exepense-Tracker_owner:dwvXC1KR2TPs@ep-cold-hall-a5eoicaj.us-east-2.aws.neon.tech/Expense-tracker?sslmode=require',
    }
  }