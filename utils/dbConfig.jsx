import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {schema} from './schema.jsx'
const sql = neon('postgresql://Exepense-Tracker_owner:dwvXC1KR2TPs@ep-cold-hall-a5eoicaj.us-east-2.aws.neon.tech/Expense-tracker?sslmode=require');
export const db = drizzle(sql,{schema});
