import { Component, ErrorInfo, ReactNode } from "react";

import "./ErrorBoundary.css";

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(`[ErrorBoundary][error]\n${error}`);
    console.log(`[ErrorBoundary][errorInfo]\n${JSON.stringify(errorInfo)}`);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container-centralized">
          <h3>Oops! Something went wrong</h3>
          <p>Please try to refresh the page</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
