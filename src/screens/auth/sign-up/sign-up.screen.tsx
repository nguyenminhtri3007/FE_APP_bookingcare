import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import SignUpStyle from "./styles/sign-up.style";
import InputField from "@/src/components/inputField/inputField.comp";
import { CommonColors } from "@/src/common/resource/colors";
import { Link, router, useRouter } from "expo-router";
import { Routes } from "@/src/common/resource/routes";
import SocialSignInButtons from "@/src/components/socialSignInButton/socialSignInButtons.comp";
import { SignupModel } from "@/src/data/model/signup.model";
import * as UserData from "@/src/data/management/signup.management";
import Toast from "react-native-toast-message";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SignUpScreen = () => {
    
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: ""
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    };

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: "" })); 
        let error = "";

        if (field === "email") {
            if (!value) {
                error = "Email không được để trống";
            } else if (!validateEmail(value)) {
                error = "Email không hợp lệ";
            }
        }
    
        if (field === "password") {
            if (!value) {
                error = "Mật khẩu không được để trống";
            } else if (value.length < 6) {
                error = "Mật khẩu phải có ít nhất 6 ký tự";
            }
        }
    
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = async  () => {
        const newErrors = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: ""
        };

        if (!form.email) {
            newErrors.email = "Email không được để trống";
        } else if (!validateEmail(form.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!form.password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (form.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!form.firstName) newErrors.firstName = "Tên không được để trống";
        if (!form.lastName) newErrors.lastName = "Họ không được để trống";
        if (!form.address) newErrors.address = "Địa chỉ không được để trống";

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(msg => msg !== "");
        if (!hasErrors) {
            try {
                const user = new SignupModel(
                    form.email,
                    form.password,
                    form.firstName,
                    form.lastName,
                    form.address
                );
                await UserData.createNewUser(user);
                Toast.show({ 
                    type: "success",
                    text1: "Tạo tài khoản thành công!",
                    onHide: () => {
                        router.back();
                      },
                });
                setForm({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    address: ""
                });
            } catch (error) {
                console.error("Create user error:", error);
                Toast.show({ 
                    type: "error",
                    text1: "Không thể tạo tài khoản",
                    text2: "Vui lòng thử lại sau."
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            <View style={[
                styles.inputWithIcon,
                errors.email ? styles.errorInput : null
            ]}>
                <MaterialIcons 
                    name="email" 
                    size={20} 
                    style={styles.inputIcon} 
                    color={CommonColors.gray} 
                />
                <InputField
                    style={styles.inputWithIconField}
                    placeholder="Enter your email address"
                    value={form.email}
                    onChangeText={value => handleChange("email", value)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor={CommonColors.gray}
                />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <View style={[
                styles.inputWithIcon,
                errors.password ? styles.errorInput : null
            ]}>
                <MaterialIcons 
                    name="lock-outline" 
                    size={20} 
                    style={styles.inputIcon} 
                    color={CommonColors.gray} 
                />
                <InputField
                    style={styles.inputWithIconField}
                    placeholder="Enter your password"
                    value={form.password}
                    onChangeText={value => handleChange("password", value)}
                    secureTextEntry
                    placeholderTextColor={CommonColors.gray}
                />
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <View style={[
                styles.inputWithIcon,
                errors.firstName ? styles.errorInput : null
            ]}>
                <MaterialIcons 
                    name="person" 
                    size={18} 
                    style={styles.inputIcon} 
                    color={CommonColors.gray} 
                />
                <InputField
                    style={styles.inputWithIconField}
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChangeText={value => handleChange("firstName", value)}
                    autoCapitalize="words"
                    placeholderTextColor={CommonColors.gray}
                />
            </View>
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

            <View style={[
                styles.inputWithIcon,
                errors.lastName ? styles.errorInput : null
            ]}>
                <MaterialIcons 
                    name="person" 
                    size={18} 
                    style={styles.inputIcon} 
                    color={CommonColors.gray} 
                />
                <InputField
                    style={styles.inputWithIconField}
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChangeText={value => handleChange("lastName", value)}
                    autoCapitalize="words"
                    placeholderTextColor={CommonColors.gray}
                />
            </View>
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

            <View style={[
                styles.inputWithIcon,
                errors.address ? styles.errorInput : null
            ]}>
                <MaterialIcons 
                    name="location-on" 
                    size={20} 
                    style={styles.inputIcon} 
                    color={CommonColors.gray} 
                />
                <InputField
                    style={styles.inputWithIconField}
                    placeholder="Enter your address"
                    value={form.address}
                    onChangeText={value => handleChange("address", value)}
                    autoCapitalize="sentences"
                    placeholderTextColor={CommonColors.gray}
                />
            </View>
            {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTxt}>Create an Account</Text>
            </TouchableOpacity>

            <View style={styles.signInWrapper}>
                <Text style={styles.signInTxt}>Bạn đã có tài khoản?</Text>
                <Link href={Routes.SIGN_IN} asChild>
                    <TouchableOpacity>
                        <Text style={styles.signInTxtSpan}>Đăng nhập</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.divider}></View>

            <SocialSignInButtons emailHref={Routes.SIGN_IN} />
        </View>
    );
};

const styles = SignUpStyle;

export default SignUpScreen;