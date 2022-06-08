import * as React from 'react';

interface IProjectDetails {
    ProjectName: string;
    ProjectID: number;
}

export interface ITestChildProps {
    ID: number;
    name: string;
    projectDetails?: IProjectDetails[];
}

export function TestChild (props: ITestChildProps) {
    
  return (
    <div>
      <h1>Child Component</h1>
      <p>{props.ID}</p>
      <p>{props.name}</p>
    </div>
  );
}