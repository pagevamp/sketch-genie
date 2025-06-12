import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "@rneui/themed";

import { TextTypeStyles } from "@io/constants";
import { DashboardSvg, EventsSvg, TeamSvg } from "@io/assets";

const STYLES = StyleSheet.create({
  tabBarStyle: {
    elevation: 0,
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    ...TextTypeStyles.smallText,
  },
});

const TabLayout = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabIconSelected,
        tabBarInactiveTintColor: theme.colors.tabIconDefault,
        headerShown: false,
        tabBarStyle: [
          STYLES.tabBarStyle,
          {
            backgroundColor: theme.colors.backgroundSecondary,
          },
        ],
        tabBarLabelStyle: STYLES.tabBarLabelStyle,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <DashboardSvg fill={focused ? color : theme.colors.tabIconDefault} />
          ),
        }}
      />

      <Tabs.Screen
        name="teams"
        options={{
          title: "Teams",
          tabBarIcon: ({ color, focused }) => (
            <TeamSvg fill={focused ? color : theme.colors.tabIconDefault} />
          ),
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, focused }) => (
            <EventsSvg fill={focused ? color : theme.colors.tabIconDefault} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
