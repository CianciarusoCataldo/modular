const FooterContent = () => {
  return (
    <div className="flex flex-col items-center my-2">
      <div className="flex flex-row p-2">
        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/license/cianciarusocataldo/modular-app"
          height="25"
        />

        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/package-json/v/cianciarusocataldo/modular-app?label=latest%20version"
          height="25"
        />
      </div>
    </div>
  );
};

export default FooterContent;
