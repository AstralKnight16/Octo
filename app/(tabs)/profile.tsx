import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { User, Settings, LogOut, Github, Mail, MapPin, Calendar } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '@/services/github';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { token, logout, user } = useAuth();
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getAuthenticatedUser(token!),
    enabled: !!token,
  });

  if (!token) {
    return (
      <View style={styles.container}>
        <Github size={64} color="#58a6ff" />
        <Text style={styles.title}>Welcome to Octo</Text>
        <Text style={styles.subtitle}>Sign in with GitHub to get started</Text>
        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/auth')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profileData = userData || user;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        {profileData?.avatar_url ? (
          <Image source={{ uri: profileData.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <User size={48} color="#8b949e" />
          </View>
        )}
        <Text style={styles.name}>{profileData?.name || profileData?.login}</Text>
        <Text style={styles.username}>@{profileData?.login}</Text>
        {profileData?.bio && (
          <Text style={styles.bio}>{profileData.bio}</Text>
        )}
      </View>

      <View style={styles.infoSection}>
        {profileData?.location && (
          <View style={styles.infoRow}>
            <MapPin size={16} color="#8b949e" />
            <Text style={styles.infoText}>{profileData.location}</Text>
          </View>
        )}
        {profileData?.email && (
          <View style={styles.infoRow}>
            <Mail size={16} color="#8b949e" />
            <Text style={styles.infoText}>{profileData.email}</Text>
          </View>
        )}
        {profileData?.created_at && (
          <View style={styles.infoRow}>
            <Calendar size={16} color="#8b949e" />
            <Text style={styles.infoText}>
              Joined {new Date(profileData.created_at).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.statsSection}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{profileData?.public_repos || 0}</Text>
          <Text style={styles.statLabel}>Repositories</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{profileData?.followers || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{profileData?.following || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Settings size={20} color="#f0f6fc" />
          <Text style={styles.actionButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={async () => {
            await logout();
            router.replace('/auth');
          }}
        >
          <LogOut size={20} color="#f85149" />
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#161b22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontFamily: 'GeistMono-Regular',
    color: '#8b949e',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoSection: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#30363d',
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
  },
  actionsSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#30363d',
    gap: 12,
  },
  logoutButton: {
    borderColor: '#f85149',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Medium',
    color: '#f0f6fc',
  },
  logoutButtonText: {
    color: '#f85149',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Geist-Bold',
    color: '#f0f6fc',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#8b949e',
    textAlign: 'center',
    marginBottom: 32,
  },
  signInButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-SemiBold',
    color: '#f0f6fc',
  },
});
