import * as React from 'react';
import styles from './CesocHero.module.scss';
import { INewsItem } from '../models/INewsItem';
import * as strings from 'CesocHeroWebPartStrings';

export interface INewsSlideProps {
  newsItem: INewsItem;
  isActive: boolean;
  locale?: string;
}

const NewsSlide: React.FC<INewsSlideProps> = ({ newsItem, isActive, locale }) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(locale || 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`}>
      <div
        className={styles.slideBackground}
        style={{ backgroundImage: `url(${newsItem.bannerImageUrl})` }}
      >
        <div className={styles.slideOverlay}></div>
      </div>

      <div className={styles.slideContent}>
        <div className={styles.slideText}>
          <h2 className={styles.slideTitle}>{newsItem.title}</h2>
          {newsItem.description && (
            <p className={styles.slideDescription}>{newsItem.description}</p>
          )}
          <div className={styles.slideMeta}>
            <span className={styles.slideDate}>{formatDate(newsItem.publishedDate)}</span>
            {newsItem.authorName && (
              <span className={styles.slideAuthor}>{strings.AuthorPrefix} {newsItem.authorName}</span>
            )}
          </div>
          <a
            href={newsItem.url}
            className={styles.slideLink}
            target="_self"
          >
            {strings.ReadMoreLink}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsSlide;
