import NotificationScreen from "@/src/screens/notification/notification.screen";
import { Stack } from "expo-router";

export default function index() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      <NotificationScreen />
    </>
  )
}