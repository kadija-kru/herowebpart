declare interface ICesocHeroWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SiteUrlFieldLabel: string;
  SiteUrlFieldDescription: string;
  SiteUrlFieldPlaceholder: string;
  NewsCountFieldLabel: string;
  AutoPlayIntervalFieldLabel: string;
  LoadingMessage: string;
  ErrorMessage: string;
  NoNewsMessage: string;
  ReadMoreLink: string;
  AuthorPrefix: string;
  PrevSlideAriaLabel: string;
  NextSlideAriaLabel: string;
  GoToSlideAriaLabel: string;
}

declare module 'CesocHeroWebPartStrings' {
  const strings: ICesocHeroWebPartStrings;
  export = strings;
}
