import {
  NavLink,
  Burger,
  Navbar,
  useMantineColorScheme,
  Box,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";

const NavMenu: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    router.push("/user/signin");
    showNotification({
      title: `You have been logged out.`,
      message: "Login again to resume your session.",
      color: "yellow",
    });
  };

  return (
    <Navbar
      style={{
        height: "40px",
        position: "fixed",
        top: 0,
        border: "none",
        display: "flex",
        alignItems: "end",
      }}
    >
      <Navbar.Section
        p="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Burger
          p="sm"
          opened={opened}
          onClick={() => setOpened((opened) => !opened)}
        />
        <Box style={{ display: opened ? "block" : "none", width: "200px" }}>
          <NavLink label="Menu" childrenOffset={28}>
            <Link href="/" passHref>
              <NavLink label="Home" active={router.pathname === "/"} />
            </Link>
            <Link href="/food" passHref>
              <NavLink label="Food" active={router.pathname === "/food"} />
            </Link>
            <Link href="/movie" passHref>
              <NavLink label="Movie" active={router.pathname === "/movie"} />
            </Link>
          </NavLink>

          {!session ? (
            <>
              <Link href="/user/signin" passHref>
                <NavLink
                  label="Sign In"
                  active={router.pathname === "/user/signin"}
                />
              </Link>
              <Link href="/user/signup" passHref>
                <NavLink
                  label="Sign Up"
                  active={router.pathname === "/user/signup"}
                />
              </Link>
            </>
          ) : (
            <NavLink label="User" childrenOffset={28}>
              <Link href="/user/profile" passHref>
                <NavLink
                  label="Profile"
                  active={router.pathname === "/user/profile"}
                />
              </Link>
              <NavLink label="Sign Out" onClick={() => handleSignOut()} />
            </NavLink>
          )}

          <NavLink
            label="Toggle Dark Mode"
            onClick={() => toggleColorScheme()}
            icon={dark ? <IconSun size={16} /> : <IconMoonStars size={16} />}
          />
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavMenu;
