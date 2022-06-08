import { IHttpClientOptions, HttpClientResponse, HttpClient, AadHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IAllTasks } from '../models/taskModel';
import { AZ_FUNCTION_DETAILS } from "../utils/constants";

/* Get all tasks  */
export async function GetAllTasks(
    context: WebPartContext
) {
    let taskRes: any;
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        context.aadHttpClientFactory
            .getClient(AZ_FUNCTION_DETAILS.CLIENT_ID)
            .then((client: AadHttpClient): void => {
                client
                    .get(AZ_FUNCTION_DETAILS.FUNCTION_URL, AadHttpClient.configurations.v1)
                    .then((response: HttpClientResponse): Promise<HttpClientResponse> => response.json())
                    .then((res): void => {
                        resolve();
                        taskRes = res;
                    });
            }, err => reject(err));
    });
    return taskRes;
}


/* Get Task by ID */
export async function GettaskById(
    context: WebPartContext,
    TaskID: number
) {
    let taskRes: any;

    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        context.aadHttpClientFactory
            .getClient(AZ_FUNCTION_DETAILS.CLIENT_ID)
            .then((client: AadHttpClient): void => {
                client
                    .get(
                        `${AZ_FUNCTION_DETAILS.FUNCTION_URL}/${TaskID}`,
                        AadHttpClient.configurations.v1
                    )
                    .then((response: HttpClientResponse): Promise<HttpClientResponse> => response.json())
                    .then((res): void => {
                        resolve();
                        taskRes = res;
                    });
            }, err => reject(err));
    });
    return taskRes;
}

/* Create a new */
export async function CreateNewTask(
    context: WebPartContext,
    newItems: IAllTasks
) {    
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-type", "application/json");
    requestHeaders.append("accept", "application/json");
    requestHeaders.append("Cache-Control", "no-cache");

    console.log(newItems.createdOn.toString(), newItems.description, newItems.id, newItems.isDone);
    const postOptions: IHttpClientOptions = {
        headers: requestHeaders,
        body: JSON.stringify({
            "Description": newItems.description,
            "IsDone": newItems.isDone,
            "Id": newItems.id,
            "CreatedOn": newItems.createdOn
        })
    };
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        context.aadHttpClientFactory
            .getClient(AZ_FUNCTION_DETAILS.CLIENT_ID)
            .then((client: AadHttpClient): void => {
                client.post(
                    AZ_FUNCTION_DETAILS.FUNCTION_URL,
                    AadHttpClient.configurations.v1,
                    postOptions
                ).then((response: HttpClientResponse) => {
                    if (response.ok) {
                        resolve();
                        console.log(`Task created successfully.`);
                    } else {
                        reject("Error while creating task");
                        console.log(`Error while creating task.`);
                    }
                }).catch((e: any) => {
                    reject(e);
                    console.log(`Error while creating task - ${e}.`);
                });
            });
    });
}

/* Update task */
export async function UpdateTask(
    context: WebPartContext,
    status: boolean,
    TaskID: number,
    desc: string,
    createdOn: string
) {
    const functionUrl = `${AZ_FUNCTION_DETAILS.FUNCTION_URL}/${TaskID}`;
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-type", "application/json");
    requestHeaders.append("accept", "application/json");
    requestHeaders.append("Cache-Control", "no-cache");

    const postOptions: IHttpClientOptions = {
        headers: requestHeaders,
        body: JSON.stringify({
            "Description": desc,
            "IsDone": (status ? "No" : "Yes"),
            "Id": TaskID,
            "CreatedOn": createdOn
        }),
        method: "put"
    };
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        context.aadHttpClientFactory
            .getClient(AZ_FUNCTION_DETAILS.CLIENT_ID)
            .then((client: AadHttpClient): void => {
                client.fetch(
                    functionUrl,
                    AadHttpClient.configurations.v1,
                    postOptions
                ).then((response: HttpClientResponse) => {
                    if (response.ok) {
                        resolve();
                        console.log(`Task updated successfully - ${TaskID}`);
                    } else {
                        reject("Error while updating task");
                        console.log(`Error while updating task`);
                    }
                }).catch((e: any) => {
                    reject(e);
                    console.log(`Error while updating task - ${e}.`);
                });
            });
    });
}

/* Delete task by ID */
export async function DeleteTask(
    context: WebPartContext,
    TaskID: number
) {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-type", "application/json");

    const postOptions: IHttpClientOptions = {
        headers: requestHeaders,
        method: "delete"
    };
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        context.aadHttpClientFactory
            .getClient(AZ_FUNCTION_DETAILS.CLIENT_ID)
            .then((client: AadHttpClient): void => {
                client.fetch(
                    `${AZ_FUNCTION_DETAILS.FUNCTION_URL}/${TaskID}`,
                    AadHttpClient.configurations.v1,
                    postOptions
                ).then(response => {
                    if (response.ok) {
                        resolve();
                        console.log(`Task - ${TaskID} deleted successfully.`);
                    } else {
                        console.log(`Error in deleting the task`);
                        reject("Error in deleting the task");
                    }
                }).catch((e: any) => {
                    console.log(`Error in deleting the task - ${e}`);
                    reject(e);
                });
            });
    });
} 