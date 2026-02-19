import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { INewsItem } from '../models/INewsItem';

export class NewsService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async getLatestNews(siteUrl: string, count: number = 5): Promise<INewsItem[]> {
    try {
      const endpoint = `${siteUrl}/_api/web/lists/getbytitle('Site Pages')/items?` +
        `$filter=PromotedState eq 2&` + // 2 = News Post
        `$orderby=FirstPublishedDate desc&` +
        `$top=${count}&` +
        `$select=Id,Title,Description,BannerImageUrl,FileRef,FirstPublishedDate,Author/Title&` +
        `$expand=Author`;

      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Error fetching news: ${response.statusText}`);
      }

      const data = await response.json();

      return data.value.map((item: any) => ({
        id: item.Id.toString(),
        title: item.Title,
        description: item.Description || '',
        bannerImageUrl: item.BannerImageUrl?.Url || '',
        url: `${siteUrl}${item.FileRef}`,
        publishedDate: new Date(item.FirstPublishedDate),
        authorName: item.Author?.Title || ''
      }));

    } catch (error) {
      console.error('Error in NewsService:', error);
      return [];
    }
  }
}
