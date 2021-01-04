import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

export const Highlight = ({ children, color }) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
      textDecoration: "none",
    }}
  >
    {children}
  </span>
);

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
      wrapperClassName={clsx(styles.layout)}
    >
      <div className={clsx(styles.about_container)}>
        <img
          className={clsx(styles.about_profile_img)}
          src="/img/profile.jpg"
          width="200"
        />
        <main className={clsx(styles.about_description)}>
          <p>
            Hi 👋 <br />I am <Highlight color="#203666">Rémi Doreau</Highlight>,
            a french FullStack Developer passionated about the{" "}
            <span>Software Engineering world</span>. <br />I also have a{" "}
            <a href="https://remidoreau.com/">
              <Highlight color="#203666">blog</Highlight>
            </a>{" "}
            where you can find various articles about programming, soft
            skills... in french and english. <br />
            You can find most of my work on{" "}
            <a href="https://github.com/ayshiff/">
              <Highlight color="#203666">GitHub</Highlight>
            </a>{" "}
            and{" "}
            <a href="https://gitlab.com/ayshiff">
              <Highlight color="#203666">GitLab</Highlight>
            </a>
            .
            <br />
            In my free time I love doing <span>algorithms</span> and{" "}
            <span>competitive programming</span>.
          </p>
        </main>
      </div>
    </Layout>
  );
}

export default Home;
