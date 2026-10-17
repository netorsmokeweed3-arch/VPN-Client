import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

interface ServerItem {
  id: string;
  name: string;
  countryCode: string;
}

const MOCK_SERVERS: ServerItem[] = [
  { id: '1', name: 'Німеччина (Безкоштовний)', countryCode: 'de' },
  { id: '2', name: 'Нідерланди (Швидкий)', countryCode: 'nl' },
  { id: '3', name: 'Японія (Схід)', countryCode: 'jp' },
];

export const VPNControlScreen = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setActiveId(id);
    console.log(`[UI] Натиснуто підключення до сервера ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ASTRA VPN</Text>
      <Text style={styles.statusText}>
        {activeId ? '🟢 Статус: Підключено' : '⚪ Статус: Не підключено'}
      </Text>

      <FlatList<ServerItem>
        data={MOCK_SERVERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = activeId === item.id;
          return (
            <View style={[styles.card, isSelected && styles.activeCard]}>
              <View>
                <Text style={styles.serverName}>{item.name}</Text>
                <Text style={styles.countryCode}>Регіон: {item.countryCode.toUpperCase()}</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.connectButton, isSelected && styles.disconnectButton]} 
                onPress={() => handleConnect(item.id)}
              >
                <Text style={styles.buttonText}>{isSelected ? 'Відключити' : 'Підключити'}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07191a', padding: 20 },
  headerTitle: { color: '#00ced1', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, letterSpacing: 2 },
  statusText: { color: '#ff8c00', fontSize: 14, textAlign: 'center', marginBottom: 24, fontWeight: '600' },
  card: { backgroundColor: '#0d282a', borderRadius: 14, padding: 16, marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#0f4c5c' },
  activeCard: { borderColor: '#ff8c00' },
  serverName: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  countryCode: { color: '#00ced1', fontSize: 12, marginTop: 4 },
  connectButton: { backgroundColor: '#ff8c00', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  disconnectButton: { backgroundColor: '#d9534f' },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
});