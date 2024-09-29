import 'dotenv/config.js'
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import * as schema from  '@/db/schema'

const sql  = neon(process.env.NEON_DATABASE_URL!)
const db = drizzle(sql, {schema})
async function main(){
    try{    
        console.log('start reseting')
        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)
        await db.delete(schema.userSubscription)
        console.log('finish reseting')
    }
    catch(e){
        console.error(e)
        throw new Error("Failed reseting the database")
    }
}

main()