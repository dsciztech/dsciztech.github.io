import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Tanış</>,
    description: (
      <>
        Enstitü içerisinde yeni yüzlerle
        tanışırken arkadaşlar edin.
      </>
    ),
  },
  {
    title: <>Öğren</>,
    description: (
      <>
        Güncel konuları anlayabileceğin biçimde
        toplulukla öğren.
      </>
    ),
  },
  {
    title: <>Geliştir</>,
    description: (
      <>
        Yeni arkadaşlarınla birlikte uygulamalar,
        dijital tasarımlar geliştir.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className='text--center'>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='Developer Student Clubs at Izmir Institute of Technology'>
      <header
        className={clsx('hero hero--secondary', styles.heroBanner)}
        style={{
          backgroundColor: 'black',
          height: '32em',
          padding: '0.64em',
        }}>
        <div className='container'>
          <h1
            className='hero__title'
            style={{
              color: 'white',
              fontSize: '4em',
              paddingBottom: '0.32em',
            }}>
            Bizimle yılına anlam kat.
          </h1>
          <span
            style={{
              backgroundColor: 'white',
              padding: '1.28em',
            }}>
            <a
              href={useBaseUrl('docs/')}
              style={{
                color: 'black',
                fontSize: '2em',
                fontWeight: 900,
                textDecoration: 'underline',
              }}>
              Buraya tıkla, DSCIZTECH'e katıl.
            </a>
          </span>
        </div>
      </header>
      <main>
        <h1 style={{
          fontSize: '4em',
          paddingTop: '0.64em',
          textAlign: 'center',
        }}>Niye <u>biz</u>?</h1>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className='container'>
              <div className='row'>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
