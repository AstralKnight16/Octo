import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Search, TrendingUp, Sparkles } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { searchRepositories } from '@/services/github';
import { useAuth } from '@/contexts/AuthContext';

export default function ExploreScreen() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchRepositories(token!, debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.length > 2,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setTimeout(() => setDebouncedQuery(text), 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#8b949e" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories..."
          placeholderTextColor="#8b949e"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView style={styles.content}>
        {!debouncedQuery ? (
          <View style={styles.emptyState}>
            <Sparkles size={48} color="#58a6ff" />
            <Text style={styles.emptyTitle}>Explore GitHub</Text>
            <Text style={styles.emptySubtitle}>
              Search for repositories, users, or topics
            </Text>
          </View>
        ) : isLoading ? (
          <Text style={styles.loading}>Searching...</Text>
        ) : results && results.length > 0 ? (
          results.map((repo) => (
            <TouchableOpacity key={repo.id} style={styles.resultCard}>
              <Text style={styles.resultName}>{repo.full_name}</Text>
              {repo.description && (
                <Text style={styles.resultDescription} numberOfLines={2}>
                  {repo.description}
                </Text>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResults}>No results found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#30363d',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#f0f6fc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  resultName: {
    fontSize: 16,
    fontFamily: 'Geist-SemiBold',
    color: '#58a6ff',
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    lineHeight: 20,
  },
  loading: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 32,
  },
  noResults: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 32,
  },
});
