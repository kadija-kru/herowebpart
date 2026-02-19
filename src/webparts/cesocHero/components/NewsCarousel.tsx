import * as React from 'react';
import styles from './CesocHero.module.scss';
import { INewsItem } from '../models/INewsItem';
import NewsSlide from './NewsSlide';
import * as strings from 'CesocHeroWebPartStrings';

export interface INewsCarouselProps {
  newsItems: INewsItem[];
  autoPlayInterval: number;
  locale?: string;
}

export interface INewsCarouselState {
  currentIndex: number;
}

export default class NewsCarousel extends React.Component<INewsCarouselProps, INewsCarouselState> {
  private autoPlayTimer: number | undefined;

  constructor(props: INewsCarouselProps) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  public componentDidMount(): void {
    this.startAutoPlay();
  }

  public componentWillUnmount(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    if (this.props.autoPlayInterval > 0) {
      this.autoPlayTimer = window.setInterval(() => {
        this.nextSlide();
      }, this.props.autoPlayInterval);
    }
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  private nextSlide = (): void => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % this.props.newsItems.length
    }));
  }

  private prevSlide = (): void => {
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex === 0
        ? this.props.newsItems.length - 1
        : prevState.currentIndex - 1
    }));
  }

  private goToSlide = (index: number): void => {
    this.setState({ currentIndex: index });
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  public render(): React.ReactElement<INewsCarouselProps> {
    const { newsItems, locale } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className={styles.carousel}>
        <div className={styles.carouselInner}>
          {newsItems.map((newsItem, index) => (
            <NewsSlide
              key={newsItem.id}
              newsItem={newsItem}
              isActive={index === currentIndex}
              locale={locale}
            />
          ))}
        </div>

        {newsItems.length > 1 && (
          <>
            <button
              className={`${styles.carouselControl} ${styles.prev}`}
              onClick={this.prevSlide}
              aria-label={strings.PrevSlideAriaLabel}
            >
              <span>‹</span>
            </button>

            <button
              className={`${styles.carouselControl} ${styles.next}`}
              onClick={this.nextSlide}
              aria-label={strings.NextSlideAriaLabel}
            >
              <span>›</span>
            </button>

            <div className={styles.carouselIndicators}>
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => this.goToSlide(index)}
                  aria-label={`${strings.GoToSlideAriaLabel} ${index + 1}`}
                />
              ))}
              <div className={styles.counter}>
                {currentIndex + 1}/{newsItems.length}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
