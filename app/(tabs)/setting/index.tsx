import SettingScreen from "@/src/screens/setting/setting.screen";
import { Stack } from "expo-router";

export default function index() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      <SettingScreen />
    </>
  )
}