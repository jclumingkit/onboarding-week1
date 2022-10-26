import type { AppProps } from "next/app";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  Session,
  useUser,
} from "@supabase/auth-helpers-react";

import NavMenu from "../components/NavMenu";
import { useRouter } from "next/router";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <AppShell header={<NavMenu />}>
              {router.pathname.includes("/sign") ? (
                <AuthProvider>
                  <Component {...pageProps} />
                </AuthProvider>
              ) : (
                <Component {...pageProps} />
              )}
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionContextProvider>
  );
}

function AuthProvider({ children }: { children: JSX.Element }) {
  const user = useUser();
  const router = useRouter();
  if (user !== null) {
    router.push("/user/profile");
    return null;
  }

  return children;
}

export default MyApp;
