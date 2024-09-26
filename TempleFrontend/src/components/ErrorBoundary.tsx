import React, { ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobal } from '../contexts/GlobalContext';
import { logError } from '../utils/errorLogging';

// Interface voor de props van de ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode;
}

// Interface voor de state van de ErrorBoundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundaryClass: Een class component die fouten opvangt in zijn child componenten
 * 
 * Deze component vangt JavaScript fouten op in de hele onderliggende component tree,
 * logt deze fouten, en toont een fallback UI in plaats van de component tree die crashte.
 */
class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state zodat de volgende render de fallback UI zal tonen
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log de fout naar een error reporting service
    logError(error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    // Reset de state en probeer de app opnieuw te laden
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDisplay testID="error-boundary-display" />;
    }

    return this.props.children;
  }
}

// Interface voor de props van de ErrorDisplay component
interface ErrorDisplayProps {
  testID?: string;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReload: () => void;
}

/**
 * ErrorDisplay: Een functionele component die de foutmelding weergeeft
 * 
 * Deze component toont een gebruiksvriendelijke foutmelding en biedt de mogelijkheid
 * om de app opnieuw te laden.
 */
const ErrorDisplay: React.FC<{ testID?: string }> = ({ testID }) => {
  const { error } = useGlobal();

  return (
    <View style={styles.container} testID={testID}>
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
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  errorDetails: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorStack: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorBoundaryClass;