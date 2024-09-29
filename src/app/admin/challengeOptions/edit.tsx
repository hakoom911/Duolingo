import {SimpleForm, Edit, required, TextInput, ReferenceInput, NumberInput, BooleanInput} from 'react-admin';

export function ChallengeOptionEdit(){
    return <Edit>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]} label="Id"/>
            <TextInput source='text' validate={[required()]} label="Text"/>
            <BooleanInput source='correct' label="Correct Option" />
            <ReferenceInput source='challengeId' reference='challenges'/>
            <TextInput source='imageSrc' label="Image"/>
            <TextInput source='audioSrc' label="Audio"/>
        </SimpleForm>
    </Edit>
}
