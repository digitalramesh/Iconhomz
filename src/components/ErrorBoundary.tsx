import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#E7E5E4] p-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
              ICONHOMZ
            </p>
            <h1 className="font-display text-2xl font-semibold text-[#1C1917]">
              Something went wrong
            </h1>
            <p className="text-sm text-[#57534E] leading-relaxed">
              We encountered an unexpected issue loading this view. Please reload the page to continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="h-10 px-5 bg-[#D96B27] hover:bg-[#B85418] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
