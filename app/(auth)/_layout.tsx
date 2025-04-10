// app/(auth)/_layout.tsx

import { Redirect, Slot } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function AuthLayout() {
  const { user } = useUser();

  

  if (user) {
    return <Redirect href="/todo" />; // Już jesteś zalogowany? To spadaj do TODO 
  }

  return <Slot />; // Pokazuje sign.tsx albo index.tsx
}