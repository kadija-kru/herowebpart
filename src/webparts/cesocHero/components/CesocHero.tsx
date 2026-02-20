import * as React from 'react';
import styles from './CesocHero.module.scss';
import { ICesocHeroProps } from './ICesocHeroProps';
import { INewsItem } from '../models/INewsItem';
import { NewsService } from '../services/NewsService';
import NewsCarousel from './NewsCarousel';
import * as strings from 'CesocHeroWebPartStrings';

export interface ICesocHeroState {
  newsItems: INewsItem[];
  loading: boolean;
  error: string;
}

export default class CesocHero extends React.Component<ICesocHeroProps, ICesocHeroState> {
  private newsService: NewsService;

  constructor(props: ICesocHeroProps) {
    super(props);

    this.state = {
      newsItems: [],
      loading: true,
      error: ''
    };

    this.newsService = new NewsService(this.props.context);
  }

  public async componentDidMount(): Promise<void> {
    await this.loadNews();
  }

  public async componentDidUpdate(prevProps: ICesocHeroProps): Promise<void> {
    if (prevProps.siteUrl !== this.props.siteUrl ||
        prevProps.newsCount !== this.props.newsCount) {
      await this.loadNews();
    }
  }

  private async loadNews(): Promise<void> {
    try {
      this.setState({ loading: true, error: '' });

      const siteUrl = this.props.siteUrl || this.props.context.pageContext.web.absoluteUrl;
      const newsItems = await this.newsService.getLatestNews(siteUrl, this.props.newsCount);

      this.setState({
        newsItems,
        loading: false
      });
    } catch (error) {
      this.setState({
        error: strings.ErrorMessage,
        loading: false
      });
    }
  }

  public render(): React.ReactElement<ICesocHeroProps> {
    const { loading, error, newsItems } = this.state;
    const { title, description } = this.props;

    return (
      <div className={styles.cesocHero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>{title || strings.DefaultHeroTitle}</h1>
            {description && (
              <p className={styles.heroDescription}>{description}</p>
            )}
          </div>

          <div className={styles.heroRight}>
            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>{strings.LoadingMessage}</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && newsItems.length > 0 && (
              <NewsCarousel
                newsItems={newsItems}
                autoPlayInterval={this.props.autoPlayInterval}
                locale={this.props.context.pageContext.cultureInfo.currentUICultureName}
              />
            )}

            {!loading && !error && newsItems.length === 0 && (
              <div className={styles.noNews}>
                <p>{strings.NoNewsMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
