import * as React from 'react';
import { IAllTasks } from "../../models/taskModel";

export interface INewTaskProps {
    newTaskRedirect: any;
    CloseNewForm: any;
}

export function NewTask(props: INewTaskProps) {

    const [Id, setId] = React.useState(null);
    const [createdOn, setCreatedOn] = React.useState("");
    const [IsDone, setIsDone] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {

    });

    const AddTask = () => {
        const newItems: IAllTasks = {
            id: parseInt(Id),
            createdOn: createdOn,
            isDone: IsDone,
            description: description
        };
        props.newTaskRedirect(newItems);
    };

    return (
        <div>
            <br />
            <label htmlFor="Id"><strong>ID:</strong></label><br />
            <input type="text" id="Id"
                value={Id} onChange={(e) => setId(e.target.value)} /><br />

            <label htmlFor="createdOn"><strong>Created On:</strong></label><br />
            <input type="text" id="createdOn"
                value={createdOn} onChange={(e) => setCreatedOn(e.target.value)} /><br />

            <label htmlFor="isDone"><strong>Is Done:</strong></label><br />
            <input type="text" id="isDone"
                value={IsDone} onChange={(e) => setIsDone(e.target.value)} /><br />

            <label htmlFor="description"><strong>Description:</strong></label><br />
            <input type="text" id="description"
                value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />

            <button onClick={AddTask}><strong>Add</strong></button>
            <button onClick={props.CloseNewForm}><strong>Close</strong></button>
            <br /><br />
        </div>
    );
}
