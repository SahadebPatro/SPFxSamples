import { MSGraphClient, AadHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export const GetMyInfo = async (context: WebPartContext) => {
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        context.msGraphClientFactory
            .getClient()
            .then((client: MSGraphClient): void => {
                // get information about the current user from the Microsoft Graph
                client
                    .api('/me')
                    .get((error, response: any, rawResponse?: any) => {
                        // handle the response
                        debugger;
                        resolve();
                    });
            }).catch(e => {
                reject(e);
            });
    });
    debugger;
};