import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface INewWebpartTwoProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  projectName: string;
  Toggle: boolean;
  country: string;
  context: WebPartContext;
}

export interface ISPResponse {
  Title: string;
  Id: number;
}
