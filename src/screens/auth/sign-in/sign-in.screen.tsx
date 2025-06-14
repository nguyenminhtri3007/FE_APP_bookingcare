import { Text, TouchableOpacity, View,
    Pressable
 } from "react-native";
import SignInStyle from "./sign-in.style";
import { Link, router } from "expo-router";
import InputField from "@/src/components/inputField/inputField.comp";
import { CommonColors } from "@/src/common/resource/colors";
import { Routes } from "@/src/common/resource/routes";
import SocialSignInButtons from "@/src/components/socialSignInButton/socialSignInButtons.comp";
import * as AuthManagement from "../../../data/management/auth.management";
import { AuthModel } from "@/src/data/model/auth.model";
import { Formik } from "formik";
import * as Yup from 'yup';
import FormStyle from "@/src/common/styles/form.styles";
import { ErrorModel } from "@/src/common/model/error.model";
import { HttpCode } from "@/src/common/resource/http-code";
import { AppConfig } from "@/src/common/config/app.config";
import { UserModel } from "@/src/data/model/user.model";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import store from '@/src/data/store/store.config';
import * as UserActions from '@/src/data/store/actions/user.actions';
import Toast from "react-native-toast-message";


const signInform = Yup.object().shape({
    email: Yup.string()
        .email('invalidEmail')
        .required('required'),
    password: Yup.string()
        .min(6, 'minLength6')
        .required('required')
        
})

const SignInScreen = () => {
    const FormValidate = {
        REQUIRED: 'required',
        INVALID_EMAIL: 'invalidEmail',
        MIN_LENGTH_6: 'minLength6',
        INVALID_INFO: 'invalidInfo'
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleSignIn = async (
        email: string,
        password: string,
        setErrors: (errors: Record<string, string>) => void
    ) => {
        try {
            let data = new AuthModel(email, password);
            const response = await AuthManagement.signIn(data);
            // const userInfo = new UserModel().convertObj(response?.info);
            // await new AppConfig().setAccessToken(response.access_token);
            // await new AppConfig().setRefreshToken(response.refresh_token);
            await new AppConfig().setUserId(response.user.id);  
            store.dispatch(UserActions.saveLoggedUser(response.user));         
            router.dismissAll();
            router.push("/(tabs)");
        } catch (error: any) {
            console.log(error);
            const status = error?.status;
            const message = error?.message;
            if (status === HttpCode.BAD_REQUEST) {
                if (message?.includes('Thông tin đăng nhập không chính xác')) {
                    setErrors({ email: FormValidate.INVALID_INFO });
                     Toast.show({
                    type: 'error',
                    text1: 'Đăng nhập thất bại',
                    text2: 'Email hoặc mật khẩu không chính xác',
                    position: 'top',
                    visibilityTime: 3000,
                  });
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Đăng nhập tài khoản
            </Text>
            <View style={FormStyle.formContainer}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={signInform}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(values, { setErrors }) => {
                        handleSignIn(values.email, values.password, setErrors);
                    }}
                >
                    {({ handleChange, handleSubmit, handleBlur, errors, touched }) => {
                        return (
                            <>
                                <View style={FormStyle.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputIconContainer}>
                                            <Ionicons name="mail-outline" size={20} color="#666" />
                                        </View>
                                        <InputField
                                            placeholder="Nhập email của bạn"
                                            placeholderTextColor={CommonColors.gray}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            invalid={!!(touched.email && errors.email) || errors.email === FormValidate.INVALID_INFO}
                                            style={styles.inputWithIcon}
                                        />
                                    </View>
                                    {touched.email && errors.email === FormValidate.REQUIRED && (
                                        <Text style={FormStyle.valiTextFalse}>Email không được để trống</Text>
                                    )}
                                    {touched.email && errors.email === FormValidate.INVALID_EMAIL && (
                                        <Text style={FormStyle.valiTextFalse}>Email không hợp lệ</Text>
                                    )}
                                    {errors.email === FormValidate.INVALID_INFO && (
                                        <Text style={FormStyle.valiTextFalse}>Thông tin đăng nhập không chính xác</Text>
                                    )}
                                </View>
                                <View style={FormStyle.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputIconContainer}>
                                            <Ionicons name="lock-closed-outline" size={20} color="#666" />
                                        </View>
                                        <InputField
                                            placeholder="Nhập mật khẩu của bạn"
                                            placeholderTextColor={CommonColors.gray}
                                            secureTextEntry={!showPassword}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            invalid={!!(touched.password && errors.password) || errors.email === FormValidate.INVALID_INFO}
                                            style={styles.inputWithIcon}
                                        />
                                        <Pressable
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={styles.eyeIcon}
                                        >
                                            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
                                        </Pressable>
                                    </View>
                                    {touched.password && errors.password === FormValidate.REQUIRED && (
                                        <Text style={FormStyle.valiTextFalse}>Mật khẩu không được để trống</Text>
                                    )}
                                    {touched.password && errors.password === FormValidate.MIN_LENGTH_6 && (
                                        <Text style={FormStyle.valiTextFalse}>Mật khẩu phải có độ dài tối thiểu 6 ký tự</Text>
                                    )}
                                    {errors.email === FormValidate.INVALID_INFO && (
                                        <Text style={FormStyle.valiTextFalse}>Thông tin đăng nhập không chính xác</Text>
                                    )}
                                    <Link href={Routes.FORGOT_PASSWORD} asChild>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }}>
                                            <Text style={[styles.signInTxtSpan, { fontSize: 14 }]}>
                                                Quên mật khẩu?
                                            </Text>
                                        </TouchableOpacity>
                                    </Link>                                
                                </View>

                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.btnTxt}>Đăng nhập</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                </Formik>
            </View>
            <View style={styles.signInWrapper}>
                <Text style={styles.signInTxt}>
                    Bạn chưa có tài khoản?
                </Text>
                <Link href={Routes.SIGN_UP} asChild>
                    <TouchableOpacity>
                        <Text style={styles.signInTxtSpan}>Đăng ký</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.divider}></View>

            <SocialSignInButtons emailHref={Routes.SIGN_IN} />
        </View>
    );
};

const styles = SignInStyle;

export default SignInScreen;
