import * as React from 'react';

export interface ITestClassProps {
}

export interface ITestClassState {
    ID: number;
}

export default class TestClass extends React.Component<ITestClassProps, ITestClassState> {
  constructor(props: ITestClassProps) {
    super(props);

    this.state = {
        ID: 0
    }
  }

  componentDidMount(): void {
      
  }

  public render() {
    return (
      <div>
        
      </div>
    );
  }
}
