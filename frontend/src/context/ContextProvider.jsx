import { AuthProvider } from "./AuthContext";
import { TrendingProvider } from "./TrendingContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <TrendingProvider>{children}</TrendingProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
