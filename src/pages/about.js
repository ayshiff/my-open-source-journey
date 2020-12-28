import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className={clsx(styles.about_container)}>
        <img
          className={clsx(styles.about_profile_img)}
          src="static/img/profile.jpg"
          width="200"
        />
        <main className={clsx(styles.about_description)}>
          <p>
            Hi 👋 <br />I am <span>Rémi Doreau</span>, a french FullStack
            Developer passionated about the Software Engineering word. <br />
            I also have a blog where you can find various articles about
            programming and other IT stuff in french and english. <br />
            Things I am passionated about: <br />
            <ul>
              <li>
                <span>Web Development</span> - Frontend (React - RxJS) - Backend
                (Go, JS…){" "}
              </li>
              <li>
                <span>Mobile Develoment</span> (Swift - React Native){" "}
              </li>
              <li>
                <span>Cloud</span> (GCP, Azure, AWS){" "}
              </li>
              <li>
                <span>Algorithmic - Competitive programming</span> (Google Code
                Jam, Facebook Hacker Cup, Meilleur Dev de France…){" "}
              </li>
              <li>
                <span>DevOps</span> (CI / CD - Docker - Kubernetes - Ansible -
                Terraform){" "}
              </li>
              <li>
                <span>MeetUps</span> - Conferences - Speaker (Paris Open Source
                Summit…){" "}
              </li>
              <li>
                <span>Hackathons</span> - React-Europe Hackathon - Cooperathon{" "}
              </li>
              <li>
                <span>Computer Science</span> (Automation - ML - Big Data…){" "}
              </li>
            </ul>
            You can find most of my work on GitHub and GitLab. I generally post
            news on Linkedin and Twitter. I also try to help others on
            StackOverflow.
          </p>
        </main>
      </div>
    </Layout>
  );
}

export default Home;
