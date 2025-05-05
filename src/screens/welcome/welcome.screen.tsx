import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyle from "./styles/welcome.style";
import { Link, useRouter } from "expo-router";
import { Routes } from "@/src/common/resource/routes";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight } from "react-native-reanimated";
import SocialSignInButtons from "@/src/components/socialSignInButton/socialSignInButtons.comp";



type Props = {};

const WelcomeScreen = (props: Props) => {
    const router = useRouter();
    return (
        <>
            <ImageBackground
                source={require('@/assets/images/splash.jpg')}
              style={{ flex: 1 }}
                resizeMode="contain"
            >
                <View style={styles.container}>
                    <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 1)"]}
                        style={styles.background}
                    >
                        <View style={styles.wrapper}>
                            <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>
                                Booking Care
                            </Animated.Text>
                            <Animated.Text style={styles.description} entering={FadeInRight.delay(500).duration(300).springify()}>
                                Giải pháp cho nhu cầu sức khỏe của bạn
                            </Animated.Text>
                            <SocialSignInButtons emailHref={Routes.SIGN_IN} />
                            <View style={styles.signInWrapper}>
                                <Text style={styles.signInTxt}>
                                    Bạn đã có tài khoản?
                                </Text>
                                <Link href={Routes.SIGN_UP} asChild>
                                    <TouchableOpacity>
                                        <Text style={styles.signInTxtSpan}>Đăng ký</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </>
    );
};

const styles = WelcomeStyle;

export default WelcomeScreen;
