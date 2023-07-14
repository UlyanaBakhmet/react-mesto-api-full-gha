function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2023 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
