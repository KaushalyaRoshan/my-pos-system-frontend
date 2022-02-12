const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <p className="text-center text-muted">
          Made with 💗- © {year} <a href="http://google.com">NKRD</a>, Inc
        </p>
      </footer>
    </div>
  );
};

export default Footer;
