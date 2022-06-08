import * as React from 'react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import { INewWebpartTwoProps } from "../../models";
import NewWebpartTwo from "../../components/NewWebpartTwo";
import { CRUD } from "../../components/CRUD";
import { ReactConcepts } from "../../components/ReactConcepts";
import { GraphCall } from "../../components/GraphCall";
import { AzFunction } from "../../components/azFunction";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
};

export function HomeConatiner(props: INewWebpartTwoProps) {
    return (
        <>
            <h3>SharePoint Franmework (SPFx) demo !</h3>
            <Pivot aria-label="Basic Pivot Example">
                <PivotItem
                    headerText="OOB Webpart"
                    headerButtonProps={{
                        'data-order': 1,
                        'data-title': 'OOB Webpart',
                    }}
                >
                    <Label styles={labelStyles}>
                        <NewWebpartTwo {...props} />
                    </Label>
                </PivotItem>
                <PivotItem headerText="CRUD">
                    <Label styles={labelStyles}>
                        <CRUD />
                    </Label>
                </PivotItem>
                <PivotItem headerText="Graph API">
                    <Label styles={labelStyles}>
                        <GraphCall context={props.context} />
                    </Label>
                </PivotItem>
                <PivotItem headerText="React Concepts">
                    <Label styles={labelStyles}>
                        <ReactConcepts />
                    </Label>
                </PivotItem>
                <PivotItem headerText="Azure Function in SPFx">
                    <Label styles={labelStyles}>
                        <AzFunction {...props} />
                    </Label>
                </PivotItem>
            </Pivot>
        </>
    );
}
