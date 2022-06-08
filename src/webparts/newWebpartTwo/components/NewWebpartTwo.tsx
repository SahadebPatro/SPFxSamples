import * as React from 'react';
import styles from './NewWebpartTwo.module.scss';
import { INewWebpartTwoProps } from '../models';
import { escape } from '@microsoft/sp-lodash-subset';
import { SimpleBtn, SimpleBtn2 } from "./simpleBtn";
import { GetCurrency } from "../utils/commonMethods";

export default class NewWebpartTwo extends React.Component<INewWebpartTwoProps, {}> {
  public render(): React.ReactElement<INewWebpartTwoProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      projectName,
      Toggle,
      country
    } = this.props;

    return (
      <section className={`${styles.newWebpartTwo} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
          <div>Web part property value: <strong>{escape(projectName)}</strong></div>
          <div>Web part property value: <strong>{GetCurrency(country)}</strong></div>
        </div>

        {Toggle ?
          <SimpleBtn /> : null
        }

        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank">Microsoft 365 Developer Community</a></li>
          </ul>

          <p><strong>Configure SPFx webpart property</strong></p>
          <ul className={styles.links}>
            <li><a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane" target="_blank">SharePoint Framework property configuration</a></li>
            <li><a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/build-custom-property-pane-controls" target="_blank">Build custom controls for the property pane</a></li>
          </ul>
        </div>
      </section>
    );
  }
}
