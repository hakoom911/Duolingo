import {SimpleForm, Create, required, TextInput, ReferenceInput, NumberInput} from 'react-admin';

export function LessonCreate(){
    return <Create>
        <SimpleForm>
            <TextInput source='title' validate={[required()]} label="Title"/>
            <ReferenceInput source='unitId' reference='units'/>
            <NumberInput source="order" validate={[required()]} label="Order"/>
        </SimpleForm>
    </Create>
}
