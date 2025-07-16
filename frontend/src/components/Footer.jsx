export const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        Made with{" "}
        <a
          href="https://github.com/aca18awk/ml_demo_web_app"
          target="_blank"
          rel="noreferrer"
        >
          ML demo web app
        </a>{" "}
        template written by{" "}
        <a href="https://github.com/aca18awk" target="_blank" rel="noreferrer">
          Aleksandra Kulbaka
        </a>
      </p>
    </div>
  );
};

const styles = {
  footer: "text-center text-gray-500 text-sm",
};
