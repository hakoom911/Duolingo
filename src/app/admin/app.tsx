"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import { CourseList } from "./courses/list";
import { CourseCreate } from "./courses/create";
import { CourseEdit } from "./courses/edit";
import { UnitList } from "./units/list";
import { UnitCreate } from "./units/create";
import { UnitEdit } from "./units/edit";
import { LessonList } from "./lessons/list";
import { LessonCreate } from "./lessons/create";
import { LessonEdit } from "./lessons/edit";
import { ChallengeList } from "./challenges/list";
import { ChallengeCreate } from "./challenges/create";
import { ChallengeEdit } from "./challenges/edit";
import { ChallengeOptionList } from "./challengeOptions/list";
import { ChallengeOptionCreate } from "./challengeOptions/create";
import { ChallengeOptionEdit } from "./challengeOptions/edit";
const dataProvider = simpleRestProvider('/api/admin')

export default function App(){
    return <Admin dataProvider={dataProvider}>
        <Resource  name="courses" recordRepresentation='title' list={CourseList} create={CourseCreate} edit={CourseEdit} />
        <Resource  name="units" recordRepresentation='title' list={UnitList} create={UnitCreate} edit={UnitEdit} />
        <Resource  name="lessons" recordRepresentation='title' list={LessonList} create={LessonCreate} edit={LessonEdit} />
        <Resource  name="challenges" recordRepresentation='id' list={ChallengeList} create={ChallengeCreate} edit={ChallengeEdit} />
        <Resource  name="challengeOptions" recordRepresentation='title' list={ChallengeOptionList} create={ChallengeOptionCreate} edit={ChallengeOptionEdit} options={{label: 'Challenge Options'}} />

    </Admin>
}