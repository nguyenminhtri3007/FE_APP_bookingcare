import { Text, TouchableOpacity, View, Animated } from "react-native";
import HeaderStyle from "./header.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { CommonColors } from "@/src/common/resource/colors";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/assets/images/logo.svg";
import { AppConfig } from "@/src/common/config/app.config";
import * as EditManagement from "@/src/data/management/edit.user.management";

type Props = {
    openSearch: () => void
};

const HeaderComponent = (props: Props) => {
    const insets = useSafeAreaInsets();
     const [userInfo, setUserInfo] = useState<any>(null);
     const scaleAnim = useRef(new Animated.Value(1)).current;

    const fetchUserInfo = async () => {
        try {
            const response = await EditManagement.getUserByIdService();
            if (response && response.users) {
                setUserInfo(response.users);
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

 const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.3, 
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, 
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        fetchUserInfo(); 
        startAnimation(); 
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.headerContent}>
                <Logo width={250} height={40} style={{ marginLeft: -20 }} />
                {userInfo && (
                    <Animated.Text
                        style={[styles.greeting, { transform: [{ scale: scaleAnim }] }]}
                    >
                        Xin chào, {userInfo.firstName}
                    </Animated.Text>
                )}
            </View>
        </View>
    )
}

const styles = HeaderStyle;

export default HeaderComponent;