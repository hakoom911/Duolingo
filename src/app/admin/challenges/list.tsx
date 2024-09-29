import {Datagrid, List, ReferenceField, SelectField, TextField} from 'react-admin';
export function ChallengeList(){
    return <List>
        <Datagrid rowClick='edit'>
            <TextField source='id' />
            <TextField source='question' />
            <SelectField source='type' choices={
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
            <ReferenceField source='lessonId' reference='lessons'/>
            <TextField source='order' />
        </Datagrid>
    </List>
}
