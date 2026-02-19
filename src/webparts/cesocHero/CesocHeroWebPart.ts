import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CesocHeroWebPartStrings';
import CesocHero from './components/CesocHero';
import { ICesocHeroProps } from './components/ICesocHeroProps';

export interface ICesocHeroWebPartProps {
  description: string;
  newsCount: number;
  autoPlayInterval: number;
  siteUrl: string;
}

export default class CesocHeroWebPart extends BaseClientSideWebPart<ICesocHeroWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICesocHeroProps> = React.createElement(
      CesocHero,
      {
        description: this.properties.description,
        context: this.context,
        newsCount: this.properties.newsCount || 5,
        autoPlayInterval: this.properties.autoPlayInterval || 5000,
        siteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteUrlFieldLabel,
                  description: strings.SiteUrlFieldDescription,
                  placeholder: strings.SiteUrlFieldPlaceholder
                }),
                PropertyPaneSlider('newsCount', {
                  label: strings.NewsCountFieldLabel,
                  min: 1,
                  max: 10,
                  value: 5,
                  showValue: true
                }),
                PropertyPaneSlider('autoPlayInterval', {
                  label: strings.AutoPlayIntervalFieldLabel,
                  min: 3000,
                  max: 10000,
                  step: 1000,
                  value: 5000,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
