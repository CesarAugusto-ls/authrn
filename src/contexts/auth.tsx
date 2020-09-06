import React, {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../service/auth';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<object | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function signOut() {
    AsyncStorage.clear();
    setUser(null);
  }

  // function setApiHeader(token){
  //   api.defaults.headers['Authorization'] = `Bearer ${token}`
  // }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user: user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}
