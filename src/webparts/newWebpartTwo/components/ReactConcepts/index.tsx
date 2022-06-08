import * as React from 'react';
import styles from '../NewWebpartTwo.module.scss';
import { TestChild } from "../TestChild";
import { NewForm } from "../newForm";

export interface IReactConceptsProps {
}

export function ReactConcepts(props: IReactConceptsProps) {
  const [counter, setCounter] = React.useState<number>(0);
  const [userName, setUserName] = React.useState<string>("John");

  const IncrementACtion = () => {
    setCounter(counter + 1);
  };

  React.useEffect(() => {
    debugger;
  }, []);

  React.useEffect(() => {
    debugger;
  }, [counter, userName]);

  const saveCallback = (name: string, company: string) => {
    debugger;
    console.log("Perform save operation here");
  };

  return (
    <>
      <h3>React Concepts</h3>
      <p><strong>Learning:</strong></p>
      <ul className={styles.links}>
        <li><a href="https://reactjs.org/tutorial/tutorial.html" target="_blank">Fundamentals of react and TypeScript</a></li>
        <li><a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">React Hooks </a></li>
      </ul>

      <input type="button" value="Increment Counter" onClick={IncrementACtion} />
      <h1>{counter}</h1>
      <TestChild ID={counter} name="Capgemini" />
      <NewForm saveCallback={saveCallback} />
    </>
  );
}
