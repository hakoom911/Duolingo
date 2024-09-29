import {SimpleForm, Create, required, TextInput} from 'react-admin';

export function CourseCreate(){
    return <Create>
        <SimpleForm>
            <TextInput source='title' validate={[required()]} label="Title"/>
            <TextInput source='imageSrc' validate={[required()]} label="Image"/>
        </SimpleForm>
    </Create>
}
