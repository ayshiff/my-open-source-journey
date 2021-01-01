import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export const Highlight = ({ children, color }) => (
  <span
    className={clsx(styles.index_highlight)}
  >
    {children}
  </span>
);


const features = [
  {
    title: 'Learn more',
    imageUrl: 'img/learn_more.svg',
    description: (
      <>
        Open Source is a great way to <b>learn from others</b>.
        All code is available, so everybody can <b>review your work</b> and
        you can <b>read</b> code written by many different developers.
      </>
    ),
  },
  {
    title: 'Build your portfolio',
    imageUrl: 'img/portfolio.svg',
    description: (
      <>
        On top of <b>paying back to the community</b> you also show to the world your <b>interests</b>,
        <b>skills</b> and <b>motivation</b>. It is also a good way to learn some good <b>software engineering practice</b>.
      </>
    ),
  },
  {
    title: 'Gain team experience',
    imageUrl: 'img/team_work.svg',
    description: (
      <>
        Getting involved in the Open Source community means that you will build a <b>professional network</b>, <b>meet great people</b>, exchange <b>ideas</b>, spark plenty of <b>quality discussions</b> and even get a new job.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
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
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="My Open Source journey"
      description="My Open Source journey">
      <header className={clsx('hero', styles.header)}>
          <img src="img/logo.svg" alt={siteConfig.title} />
          <div>
          <p className={clsx(styles.description)}>Discover the benefits of Open Source through <Highlight color="#203666">concrete examples</Highlight>. <br/> A publication <Highlight color="#203666">every week</Highlight>.</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/presentation')}>
              Get Started
            </Link>
            </div>
        </div>
        <img className={clsx(styles.arrow_down)} width="20px" src="img/arrow_down.svg" alt="arrow_down" />
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
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
