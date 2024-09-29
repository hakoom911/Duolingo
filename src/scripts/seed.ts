import 'dotenv/config.js'
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import * as schema from  '@/db/schema'

const sql  = neon(process.env.NEON_DATABASE_URL!)
const db = drizzle(sql, {schema})
async function main(){
    try{    
        console.log('start seeding')
        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)
        await db.delete(schema.userSubscription)

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/assets/es.svg"
            },
            {
                id: 2,
                title: "Italina",
                imageSrc: "/assets/it.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/assets/fr.svg"
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/assets/hr.svg"
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: 'Unit 1',
                description: "Learn the basics of Spanish",
                order: 1
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                title: 'Nouns',
                unitId: 1,
                order: 1,
            },
            // {
            //     id: 2,
            //     title: 'Verbs',
            //     unitId: 1,
            //     order: 2,
            // },
            // {
            //     id: 3,
            //     title: 'Verbs',
            //     unitId: 1,
            //     order: 3,
            // },
            // {
            //     id: 4,
            //     title: 'Verbs',
            //     unitId: 1,
            //     order: 4,
            // },
            // {
            //     id: 5,
            //     title: 'Verbs',
            //     unitId: 1,
            //     order: 5,
            // },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Nouns
                order: 1,
                question: `Which one of these is the "the man"?`,
                type: 'SELECT'
            },
            {
                id: 2,
                lessonId: 1, // Nouns
                order: 2,
                question: `Which one of these is the "the man"?`,
                type: 'ASSIST'
            },
            {
                id: 3,
                lessonId: 1, // Nouns
                order: 3,
                question: `Which one of these is the "the robot"?`,
                type: 'SELECT'
            },
            // {
            //     id: 4,
            //     lessonId: 2, // Verbs
            //     order: 1,
            //     question: `Which one of these is the "the man"?`,
            //     type: 'SELECT'
            // },
            // {
            //     id: 5,
            //     lessonId: 2, // Verbs
            //     order: 2,
            //     question: `Which one of these is the "the man"?`,
            //     type: 'ASSIST'
            // },
            // {
            //     id: 6,
            //     lessonId: 2, // Verbs
            //     order: 3,
            //     question: `Which one of these is the "the robot"?`,
            //     type: 'SELECT'
            // }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1, // which one of these is the "the man"?
                text: "el hombre",
                correct: true,
                imageSrc: '/assets/man.svg',
                audioSrc: '/assets/es_man.mp3'
            },
            {
                id: 2,
                challengeId: 1, 
                text: "la mujher",
                correct: false,
                imageSrc: '/assets/woman.svg',
                audioSrc: '/assets/es_woman.mp3',
            },
            {
                id: 3,
                challengeId: 1, 
                text: "el robot",
                correct: false,
                imageSrc: '/assets/robot.svg',
                audioSrc: '/assets/es_robot.mp3',
            },
            {
                id: 4,
                challengeId: 2, // which one of these is the "the man"?
                text: "el hombre",
                correct: true,
                audioSrc: '/assets/es_man.mp3'
            },
            {
                id: 5,
                challengeId: 2, 
                text: "la mujher",
                correct: false,
                audioSrc: '/assets/es_woman.mp3',
            },
            {
                id: 6,
                challengeId: 2, 
                text: "el robot",
                correct: false,
                audioSrc: '/assets/es_robot.mp3',
            },
            {
                id: 7,
                challengeId: 3, // which one of these is the "the robot"?
                text: "el hombre",
                correct: false,
                audioSrc: '/assets/es_man.mp3'
            },
            {
                id: 8,
                challengeId: 3, 
                text: "la mujher",
                correct: false,
                audioSrc: '/assets/es_woman.mp3',
            },
            {
                id: 9,
                challengeId: 3, 
                text: "el robot",
                correct: true,
                audioSrc: '/assets/es_robot.mp3',
            }
        ])

        console.log('finish seeding')
    }
    catch(e){
        console.error(e)
        throw new Error("Failed seeding the database")
    }
}

main()