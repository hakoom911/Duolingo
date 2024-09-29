import { auth } from "@clerk/nextjs/server";
import List from "./List";

export const revalidate = 0;

export default async function courses(){
    const {getToken} = await auth()
    const responseCourse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {headers: { Authorization: `Bearer ${await getToken()}` }});
    const responseUserProgress  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userProgress`, {headers: { Authorization: `Bearer ${await getToken()}` }})
    
    const courses = await responseCourse.json();
    
    const json = await responseUserProgress.json()
    const userProgress = json.result
    console.log("user " + userProgress?.activeCourseId)

    return <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
        <List courses={courses} activeCourseId={userProgress?.activeCourseId}></List>
    </div>
}