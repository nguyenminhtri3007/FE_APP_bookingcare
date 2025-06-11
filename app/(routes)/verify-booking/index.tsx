import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as VerifyBookingManagement from "@/src/data/management/verify-booking.management";
import { VerifyBookingModel } from "@/src/data/model/verify-booking.model";

const VerifyBookingScreen = () => {
    const { token, doctorId } = useLocalSearchParams();
    const [statusVerify, setStatusVerify] = useState(false);
    const [errCode, setErrCode] = useState(0);

    useEffect(() => {
        const verify = async () => {
            if (token && doctorId) {
                try {
                    const res = await VerifyBookingManagement.verifyBooking(
                        new VerifyBookingModel(token as string, doctorId as string)
                    );
                    setStatusVerify(true);
                    setErrCode(res?.errCode ?? -1);
                } catch (e) {
                    setStatusVerify(true);
                    setErrCode(-1);
                }
            }
        };
        verify();
    }, [token, doctorId]);

    return (
        <View style={styles.container}>
            {!statusVerify ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <View>
                    {errCode === 0 ? (
                        <Text style={styles.success}>Xác nhận lịch hẹn thành công!</Text>
                    ) : (
                        <Text style={styles.error}>Lịch hẹn không tồn tại hoặc đã được xác nhận!</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    success: { color: "green", fontSize: 18, fontWeight: "bold" },
    error: { color: "red", fontSize: 18, fontWeight: "bold" },
});

export default VerifyBookingScreen; 