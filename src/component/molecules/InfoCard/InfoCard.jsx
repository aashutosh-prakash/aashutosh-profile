import React from "react";
import Link from "next/link";
import Heading from "../../atoms/Heading";
import LinkedInIcon from "../../atoms/icons/LinkedInIcon";
import XIcon from "../../atoms/icons/XIcon";
import styles from "./info-card.module.scss";

const content = {
  greeting: "HI THERE 👋 , I'M",
  name: "Aashutosh Prakash",
  developer: "DEVELOPER",
  devEmoji: "👨‍💻",
  gameEmoji: "🎮",
  description:
    "I’m specialized in AI Front-End Transformation, with a passion for Cloud Technologies.",
  linkedIn: "https://www.linkedin.com/in/aashutoshprakash/",
  x: "https://x.com/Aashutosh_94",
  note: "NOTE: Site support device dark mode.",
};

const InfoCard = () => {
  return (
    <>
      <p>{content.greeting}</p>
      <Heading content={content.name} Type="h1" />
      <Link href="/game" className={styles.infoCard__link}>
        {content.developer}
      </Link>
      &nbsp;
      {content.gameEmoji}
      {content.devEmoji}
      <p className={styles.infoCard__description}>{content.description}</p>
      <div className={styles.infoCard__socials}>
        <a
          className={styles.infoCard__linkedin}
          href={content.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          className={styles.infoCard__x}
          href={content.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Find me on X"
        >
          <XIcon />
        </a>
      </div>
      <p className={styles.infoCard__note}>{content.note}</p>
    </>
  );
};

export default InfoCard;
