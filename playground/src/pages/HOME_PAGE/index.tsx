import { driveWithDarkMode } from "@cianciarusocataldo/modular-engine";
import { Container } from "@cianciarusocataldo/modular-ui";

/** Modular-app home page */
const HomePage = () => {
  const AppContainer = driveWithDarkMode(Container);

  return (
    <AppContainer animated unstyled>
      <div />
    </AppContainer>
  );
};

export default HomePage;
