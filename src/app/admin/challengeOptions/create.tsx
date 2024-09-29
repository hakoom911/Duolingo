import {SimpleForm, Create, required, TextInput, ReferenceInput, NumberInput, BooleanInput} from 'react-admin';

export function ChallengeOptionCreate(){
    return <Create>
        <SimpleForm>
            <TextInput source='text' validate={[required()]} label="Text"/>
            <BooleanInput source='correct' label="Correct Option" />
            <ReferenceInput source='challengeId' reference='challenges'/>
            <TextInput source='imageSrc' label="Image"/>
            <TextInput source='audioSrc' label="Audio"/>
        </SimpleForm>
    </Create>
}
