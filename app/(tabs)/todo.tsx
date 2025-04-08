import React from 'react';
import { Text, View } from 'react-native';
import { useUser } from '../context/UserContext';

export default function TodoScreen() {
    const { user } = useUser();

    if (user !== 'ZUCH') {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Brak dostępu. Zaloguj się jako ZUCH.</Text>
            </View>
        )

    }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Siema byku, ToDo jest Twoje </Text>
    </View>
  );
}