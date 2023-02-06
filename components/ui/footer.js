function Footer() {
  const year = new Date();
  const getCurrentYear = year.getFullYear();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-transparent">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <p>&copy; Todo application, {getCurrentYear}. </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
