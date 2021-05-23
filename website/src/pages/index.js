import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--outline button--info--primary"
            to="/docs/gettingStarted"
            >
              Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Contributors() {
  return (
    <>
    <div className={styles.center}>
      <h1>Contributors</h1>
    </div>
     <div className={styles.center}>
        <Link href="https://github.com/streamich/react-use/graphs/contributors">
          <img src="https://opencollective.com/react-use/contributors.svg?width=890&button=false" />
        </Link>
    </div>
    </>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <Contributors/>
      </main>
    </Layout>
  );
}
