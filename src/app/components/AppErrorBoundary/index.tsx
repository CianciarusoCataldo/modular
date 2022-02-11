import React from "react";

import { Button } from "@cianciarusocataldo/modular-ui";

/** Modular error boundary, wrap all App components to intercept most of the errors thrown
 *
 * @param {() => JSX.Element} fallback custom fallback displayed when an error is catched
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
class ErrorBoundary extends React.Component<
  { fallback?: () => JSX.Element },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      window.document.title = "Error";
      return (
        this.props.fallback || (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Button
                style={{ fontSize: "3rem", padding: "1rem" }}
                className="error-button"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try again
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
