import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import styles from '../NewWebpartTwo.module.scss';
import { INewWebpartTwoProps, IAllTasks } from "../../models";
import {
    GetAllTasks,
    CreateNewTask,
    UpdateTask,
    GettaskById,
    DeleteTask
} from "../../services/azureServices";
import { NewTask } from "./NewTask";

export function AzFunction(props: Partial<INewWebpartTwoProps>) {
    const { context } = props;
    const [allTasks, setAllTasks] = React.useState<IAllTasks[]>([]);
    const [isNewtask, setIsNewTask] = React.useState<boolean>(false);
    const [isLoader, setIsLoader] = React.useState(false);

    /* Get all tasks */
    const GetTaskListDetails = async (isDirect: boolean) => {
        debugger;
        setIsLoader(true);
        setAllTasks([]);
        let azResponse: IAllTasks[] = await GetAllTasks(context); /* Call Azure function */
        setAllTasks(azResponse);
        if (isDirect)
            setIsLoader(false);
    };

    /* Create Task */
    const CreateTask = () => {
        setIsNewTask(true);
    };
    /* Callback function for adding task */
    const AddNewTask = async (newItems: IAllTasks) => {
        setIsLoader(true);
        await CreateNewTask(context, newItems); /* Call Azure function */
        await GetTaskListDetails(false);
        setIsNewTask(false);
        setIsLoader(false);
    };

    /* Remove Tasks  */
    const RemoveTask = async (taskId: number) => {
        setIsLoader(true);
        alert(`Remove ${taskId}`);
        await DeleteTask(context, taskId);
        GetTaskListDetails(false);
        setIsLoader(false);
    };

    /* Update Tasks  */
    const UpdateStatus = async (taskId: number, state: boolean, createdOn: string, desc: string) => {
        setIsLoader(true);
        if (state) {
            alert(`Mark No - ${taskId}`);
            await UpdateTask(context, state, taskId, createdOn, desc);
        }
        else {
            alert(`Mark Yes - ${taskId}`);
            await UpdateTask(context, state, taskId, createdOn, desc);
        }
        GetTaskListDetails(false);
        setIsLoader(false);
    };

    /* Get Task by ID: Show Selected Tasks  */
    const ShowSelectedTask = (taskId: number) => {
        let currentTask = GettaskById(context, taskId);
        currentTask.then((val: IAllTasks[]) => {
            if (val)
                alert(`Values - ${val[0].id} - ${val[0].isDone} - ${val[0].description} - ${val[0].createdOn}`);
        });
    };

    const CloseNewForm = () => {
        setIsNewTask(false);
    };

    return (
        <div className='CallAzureFunctions'>
            <h3>Call Azure Function from SPFx</h3>
            <p><strong>Learning:</strong></p>
            <ul className={styles.links}>
                <li><a href="https://docs.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal" target="_blank">Create Azure SQL DB</a></li>
                <li><a href="https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-ssms?view=azuresql" target="_blank">Use SSMS to connect to and query Azure SQL Database </a></li>
                <li><a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-your-first-function-visual-studio" target="_blank">Create your first C# function in Azure using Visual Studio</a></li>
                <li><a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=in-process%2Cfunctionsv2&pivots=programming-language-csharp#authorization-keys" target="_blank">Learn: Azure Functions HTTP trigger</a></li>
                <li><a href="https://docs.microsoft.com/en-us/azure/azure-functions/" target="_blank">Learn: Azure Functions documentation</a></li>
            </ul>

            <input type='button' value="Get Tasks" onClick={() => GetTaskListDetails(true)} />
            <input type='button' value="Create Task" onClick={() => CreateTask()} />

            {isNewtask ?
                <NewTask newTaskRedirect={AddNewTask} CloseNewForm={CloseNewForm} />
                :
                null
            }
            {!isLoader ?
                <table className="table-bordered">
                    <tr>
                        <th>ID</th>
                        <th>Created On</th>
                        <th>Is Done</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    {allTasks.map(o =>
                        <tr>
                            <td onClick={() => ShowSelectedTask(o.id)}>
                                <a href="#">Task - {o.id}</a>
                            </td>
                            <td>{o.createdOn}</td>
                            <td>{o.isDone}</td>
                            <td>{o.description}</td>
                            <td colSpan={2}>
                                <input type='button' value="Remove" className='btn btn-primary'
                                    onClick={() => RemoveTask(o.id)} />
                                {(o.isDone === "Yes") ?
                                    <input type='button' value="Mark Not Done" className='btn btn-primary'
                                        onClick={() => UpdateStatus(o.id, true, o.createdOn, o.description)} />
                                    :
                                    <input type='button' value="Mark Done" className='btn btn-primary'
                                        onClick={() => UpdateStatus(o.id, false, o.createdOn, o.description)} />
                                }
                            </td>
                        </tr>
                    )}
                </table>
                :
                <Spinner title='Loading data...' size={SpinnerSize.large} />
            }
        </div>
    );
}