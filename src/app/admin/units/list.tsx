import {Datagrid, List, ReferenceField, TextField} from 'react-admin';
export function UnitList(){
    return <List>
        <Datagrid rowClick='edit'>
            <TextField source='id' />
            <TextField source='title' />
            <TextField source='description'/>
            <ReferenceField source='courseId' reference='courses'/>
            <TextField source='order' />
        </Datagrid>
    </List>
}
