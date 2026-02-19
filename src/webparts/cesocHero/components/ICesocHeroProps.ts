import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ICesocHeroProps {
  description: string;
  context: WebPartContext;
  newsCount: number;
  autoPlayInterval: number;
  siteUrl: string;
}
