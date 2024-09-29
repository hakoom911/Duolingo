import {SimpleForm, Create, required, TextInput, ReferenceInput, NumberInput, SelectInput} from 'react-admin';

export function ChallengeCreate(){
    return <Create>
        <SimpleForm>
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
    </Create>
}
