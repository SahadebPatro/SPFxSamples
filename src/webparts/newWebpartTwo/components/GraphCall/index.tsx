import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import styles from '../NewWebpartTwo.module.scss';
import { GetMyInfo } from "../../services/graphServices";

export interface IGraphCallProps {
    context: WebPartContext;
}

export function GraphCall(props: IGraphCallProps) {

    const GetMyDetailsAction = async () => {
        let users = await GetMyInfo(props.context);
        debugger;
    };

    const GetUserAction = () => {
        debugger;
    };

    return (
        <>
            <h3> Graph API calling</h3>
            <p><strong>Learning:</strong></p>
            <ul className={styles.links}>
                <li><a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph" target="_blank">Connect to Graph API from SPFx</a></li>
                <li><a href="https://docs.microsoft.com/en-us/graph/api/resources/users?view=graph-rest-1.0" target="_blank">Graph API list </a></li>
            </ul>

            <input type="button" value="Get my details" onClick={GetMyDetailsAction} />
            <input type="button" value="Get users" onClick={GetUserAction} />
        </>
    );
}
