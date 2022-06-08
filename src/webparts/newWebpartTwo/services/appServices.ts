/****
Use @pnp/sp (PnPJS) library with SharePoint Framework web parts
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/use-sp-pnp-js-with-spfx-web-parts

Pnp list CRUD operations
https://pnp.github.io/pnpjs/sp/items/

*****/


import { SPFI, spfi, SPFx } from "@pnp/sp";
import { LIST_NAMES } from "../utils/constants";
import { getSP } from "../pnpjsConfig";
import { ISPResponse } from "../models";

/* Add list Item */
export const AddData = async () => {
    const _sp: SPFI = getSP();
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        spfi(_sp).web.lists.getByTitle(LIST_NAMES.TEST2)
            .items
            .add({
                Title: `New Item ${Math.floor(Math.random() * 1000)}`
            })
            .then((response) => {
                resolve();
                debugger;
            }).catch(e => {
                debugger;
                reject(e);
            });
    });
};

/* Remove list Item */
export const RemoveData = async () => {
    const _sp: SPFI = getSP();
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        spfi(_sp).web.lists.getByTitle(LIST_NAMES.TEST2)
            .items
            .getById(1)
            .delete()
            .then((response) => {
                resolve();
                debugger;
            }).catch(e => {
                debugger;
                reject(e);
            });
    });
};

/* Get list Items */
export const GetData = async () => {
    const _sp: SPFI = getSP();
    let allItems: ISPResponse[] = [];
    await new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
        spfi(_sp).web.lists.getByTitle(LIST_NAMES.TEST2)
            .items
            .select("*", "Attachments", "AttachmentFiles")
            .expand("AttachmentFiles")
            .top(4900)()
            .then((response) => {
                allItems = response;
                resolve();
                debugger;
            }).catch(e => {
                debugger;
                reject(e);
            });
    });
    return allItems;
};


