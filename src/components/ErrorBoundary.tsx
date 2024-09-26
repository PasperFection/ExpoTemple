import React, { ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGlobal } from '../contexts/GlobalContext';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDisplay />;
    }

    return this.props.children;
  }
}

const ErrorDisplay: React.FC = () => {
  const { error } = useGlobal();

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
      {error && <Text style={styles.errorDetails}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorDetails: {
    fontSize: 14,
    color: 'red',
  },
});

export default ErrorBoundaryClass;