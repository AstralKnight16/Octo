import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Star, GitFork } from 'lucide-react-native';
import { Octicons } from '@expo/vector-icons';
import { getRepositories, getAuthenticatedUser } from '@/services/github';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'starred' | 'recent'>('all');

  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos', selectedFilter],
    queryFn: () => getRepositories(token!, selectedFilter),
    enabled: !!token,
  });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getAuthenticatedUser(token!),
    enabled: !!token,
  });

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Octo</Text>
        <Text style={styles.subtitle}>Sign in to get started</Text>
        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/auth')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {userData && (
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {userData.login}</Text>
          <Text style={styles.bio}>{userData.bio || 'GitHub enthusiast'}</Text>
        </View>
      )}

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'starred' && styles.filterButtonActive]}
          onPress={() => setSelectedFilter('starred')}
        >
          <Text style={[styles.filterText, selectedFilter === 'starred' && styles.filterTextActive]}>
            Starred
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'recent' && styles.filterButtonActive]}
          onPress={() => setSelectedFilter('recent')}
        >
          <Text style={[styles.filterText, selectedFilter === 'recent' && styles.filterTextActive]}>
            Recent
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text style={styles.loading}>Loading repositories...</Text>
      ) : repos && repos.length > 0 ? (
        repos.map((repo) => (
          <TouchableOpacity key={repo.id} style={styles.repoCard}>
            <View style={styles.repoHeader}>
            <Octicons name="repo" size={16} color="#8b949e" />
              <Text style={styles.repoName}>{repo.full_name}</Text>
            </View>
            {repo.description && (
              <Text style={styles.repoDescription} numberOfLines={2}>
                {repo.description}
              </Text>
            )}
            <View style={styles.repoStats}>
              <View style={styles.stat}>
                <Star size={14} color="#8b949e" />
                <Text style={styles.statText}>{repo.stargazers_count}</Text>
              </View>
              <View style={styles.stat}>
                <GitFork size={14} color="#8b949e" />
                <Text style={styles.statText}>{repo.forks_count}</Text>
              </View>
              <View style={styles.stat}>
              <Octicons name="git-branch" size={14} color="#8b949e" />
                <Text style={styles.statText}>{repo.language || 'N/A'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.loading}>No repositories found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    textAlign: 'center',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  signInButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignSelf: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-SemiBold',
    color: '#f0f6fc',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  filterButtonActive: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Geist-Medium',
    color: '#8b949e',
  },
  filterTextActive: {
    color: '#f0f6fc',
  },
  repoCard: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  repoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  repoName: {
    fontSize: 16,
    fontFamily: 'Geist-SemiBold',
    color: '#58a6ff',
  },
  repoDescription: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    marginBottom: 12,
    lineHeight: 20,
  },
  repoStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'GeistMono-Regular',
    color: '#8b949e',
  },
  loading: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 32,
  },
});
