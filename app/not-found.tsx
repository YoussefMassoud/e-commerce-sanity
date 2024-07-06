// app/not-found.tsx

import Link from "next/link";
import { CSSProperties } from "react";

const NotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link style={styles.link} href="/">
        Go back home
      </Link>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    padding: "0 1rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
  },
  link: {
    padding: "0.5rem 1rem",
    backgroundColor: "#000",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "0.5rem",
  },
};

export default NotFound;
