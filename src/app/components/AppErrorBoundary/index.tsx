import React from "react";

import { Button } from "@cianciarusocataldo/modular-ui";

/* istanbul ignore next */
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

  componentDidCatch(error, errorInfo) {}

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
