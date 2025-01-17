import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
  initAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading state

  // Initialize the store with persisted data from localStorage
  initAuth: () => {
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedIsAuthenticated === 'true') {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    } else {
      set({ isAuthenticated: false, user: null });
    }

    set({ isLoading: false }); // Set loading to false after checking
  },

  login: async (credentials) => {
    try {
      // Simulate an API call with mock data (replace this with actual API call)
      const mockUser = {
        id: '123',
        email: credentials.email,
        name: 'Test User',
      };

      // Store the user data and authentication status in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Update Zustand state
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  },

  signup: async (data) => {
    try {
      // Simulate an API call with mock data (replace this with actual API call)
      const mockUser = {
        id: '123',
        email: data.email,
        name: data.name,
      };

      // Store the user data and authentication status in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Update Zustand state
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    // Remove the user data and authentication status from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');

    // Reset Zustand state
    set({ user: null, isAuthenticated: false });
  },
}));
