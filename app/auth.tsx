import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { Github, Key } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { getAuthenticatedUser } from '@/services/github';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const [personalAccessToken, setPersonalAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!personalAccessToken.trim()) {
      Alert.alert('Error', 'Please enter a personal access token');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await getAuthenticatedUser(personalAccessToken);
      await setToken(personalAccessToken);
      setUser(userData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid token. Please check your personal access token.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Github size={64} color="#58a6ff" />
        <Text style={styles.title}>Welcome to Octo</Text>
        <Text style={styles.subtitle}>
          A beautiful GitHub client for mobile
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Personal Access Token</Text>
          <View style={styles.inputContainer}>
            <Key size={20} color="#8b949e" />
            <TextInput
              style={styles.input}
              placeholder="ghp_xxxxxxxxxxxx"
              placeholderTextColor="#8b949e"
              value={personalAccessToken}
              onChangeText={setPersonalAccessToken}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Text style={styles.helpText}>
            Create a token at github.com/settings/tokens
          </Text>

          <TouchableOpacity
            style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={styles.signInButtonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Geist-Medium',
    color: '#f0f6fc',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#30363d',
    gap: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'GeistMono-Regular',
    color: '#f0f6fc',
  },
  helpText: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signInButtonDisabled: {
    opacity: 0.5,
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-SemiBold',
    color: '#f0f6fc',
  },
});
