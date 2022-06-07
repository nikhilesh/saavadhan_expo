import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';




import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://33df2b3f4005494291bf197d95c197e0@o1220499.ingest.sentry.io/6363454',
  enableInExpoDevelopment: true,
  debug: true, 
  // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the //event. Set it to `false` in production
});

// Access any @sentry/react-native exports via:
//Sentry.Native.*

// Access any @sentry/browser exports via:
//Sentry.Browser.*






export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
