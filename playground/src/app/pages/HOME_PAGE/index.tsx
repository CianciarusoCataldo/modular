import { driveWithDarkMode } from "@cianciarusocataldo/modular-engine";
import { Container } from "@cianciarusocataldo/modular-ui";

/** Modular-app home page */
const HomePage = () => {
  const AppContainer = driveWithDarkMode(Container);
  return (
    <AppContainer unstyled animated>
      <div style={{ height: "1220px" }} />
    </AppContainer>
  );
};

export default HomePage;
