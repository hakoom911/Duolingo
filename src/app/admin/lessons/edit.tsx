import {SimpleForm, Edit, required, TextInput, ReferenceInput, NumberInput} from 'react-admin';

export function LessonEdit(){
    return <Edit>
        <SimpleForm>
            <TextInput source='title' validate={[required()]} label="Title"/>
            <ReferenceInput source='unitId' reference='units'/>
            <NumberInput source="order" validate={[required()]} label="Order"/>
        </SimpleForm>
    </Edit>
}
