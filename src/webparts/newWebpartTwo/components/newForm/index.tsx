import * as React from 'react';

export interface INewFormProps {
    saveCallback: any;
}

export function NewForm(props: INewFormProps) {

    const [name, setName] = React.useState("John");
    const [company, setCompany] = React.useState("Capgemini");

    const saveChangesAction = () => {
        debugger;
        props.saveCallback(name, company);
    };

    return (
        <div className='newForm'>
            <input type="text" name="Name" id="name"
                value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" name="Company" id="company"
                value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type="button" value="Save" onClick={saveChangesAction} />
        </div>
    );
}
