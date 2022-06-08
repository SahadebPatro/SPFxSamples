import * as React from 'react';
import styles from '../NewWebpartTwo.module.scss';
import { GetData, AddData, RemoveData } from "../../services";
import { ISPResponse } from "../../models";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

export interface ICRUDProps {
}

export function CRUD(props: ICRUDProps) {

    const [apiResponse, setApiResponse] = React.useState<ISPResponse[]>([]);
    const [loader, setLoader] = React.useState<boolean>(false);

    const GetDataAction = async () => {
        setLoader(true);
        let _data: ISPResponse[] = await GetData();
        setApiResponse(_data);
        setLoader(false);
        debugger;
    };

    const AddDataAction = async () => {
        await AddData();
        debugger;
    };

    const RemoveDataAction = async () => {
        await RemoveData();
        debugger;
    };

    return (
        <>
            <h3>CRUD</h3>
            <p><strong>Learning:</strong></p>
            <ul className={styles.links}>
                <li><a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/use-sp-pnp-js-with-spfx-web-parts" target="_blank">Use @pnp/sp (PnPJS) library with SharePoint Framework web parts</a></li>
                <li><a href="https://pnp.github.io/pnpjs/sp/items/" target="_blank">Pnp SharePoint list CRUD operations </a></li>
            </ul>

            <input type="button" value="Get Data" onClick={GetDataAction} />
            <input type="button" value="Add Data" onClick={AddDataAction} />
            <input type="button" value="Remove Data" onClick={RemoveDataAction} />
            {loader ?
                <Spinner size={SpinnerSize.large} title="Loading data" />
                :
                <>
                    {apiResponse.map(o => (
                        <>
                            <h1>{o.Id}</h1>
                            <h1>{o.Title}</h1>
                        </>
                    ))}
                </>
            }

        </>
    );
}
