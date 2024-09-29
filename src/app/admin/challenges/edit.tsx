import {SimpleForm, Edit, required, TextInput, ReferenceInput, NumberInput, SelectInput} from 'react-admin';

export function ChallengeEdit(){
    return <Edit>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]} label="Id"/>
            <TextInput source='question' validate={[required()]} label="Question"/>
            <SelectInput source='type' validate={[required()]} choices={
                [
                    {
                        id: 'SELECT',
                        name: 'SELECT'
                    },
                    {
                        id: 'ASSIST',
                        name: 'ASSIST'
                    },
                ]
                
            }/>
            <ReferenceInput source='lessonId' reference='lessons'/>
            <NumberInput source="order" validate={[required()]} label="Order"/>
        </SimpleForm>
    </Edit>
}
