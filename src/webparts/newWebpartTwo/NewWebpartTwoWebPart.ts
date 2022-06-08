import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown        
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'NewWebpartTwoWebPartStrings';
import { INewWebpartTwoProps } from './models';
import { HomeConatiner } from "./container/home";

import { getSP } from './pnpjsConfig';

import 'bootstrap/dist/css/bootstrap.min.css';


export interface INewWebpartTwoWebPartProps {
  description: string;
  projectName: string;
  Toggle: boolean;
  country: string;
}

export default class NewWebpartTwoWebPart extends BaseClientSideWebPart<INewWebpartTwoWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  /**
 * Initialize the web part.
 */
  public async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    //Initialize our _sp object that we can then use in other packages without having to pass around the context.
    // Check out pnpjsConfig.ts for an example of a project setup file.
    getSP(this.context);
  }

  public render(): void {
    const element: React.ReactElement<INewWebpartTwoProps> = React.createElement(
      HomeConatiner,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        projectName: this.properties.projectName,
        Toggle: this.properties.Toggle,
        country: this.properties.country,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('projectName', {
                  label: strings.ProjectNameLabel
                }),
                PropertyPaneToggle('Toggle', {
                  label: strings.ToggleLabel
                }),
                PropertyPaneDropdown('country', {
                  label: strings.CountryLabel,
                  options: [{
                    key: "India",
                    text: "India"
                  },
                  {
                    key: "USA",
                    text: "USA"
                  },
                  {
                    key: "Canada",
                    text: "Canada"
                  },
                  {
                    key: "Germany",
                    text: "Germany"
                  }]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
