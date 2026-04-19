import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-screen h-screen bg-[#020617] text-white flex items-center justify-center p-4">
                    <div className="max-w-md text-center">
                        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
                        <p className="text-gray-400 mb-6">
                            An error occurred while loading STORE IT!
                        </p>
                        <div className="bg-slate-900 p-4 rounded-lg text-left text-sm mb-6 max-h-40 overflow-auto">
                            <code className="text-red-400">
                                {this.state.error?.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
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

export default ErrorBoundary;
