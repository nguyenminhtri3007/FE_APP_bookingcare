import { Text, TouchableOpacity, View } from "react-native";
import HeaderStyle from "./header.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { CommonColors } from "@/src/common/resource/colors";
import { Link } from "expo-router";
import { useState } from "react";
import Logo from "@/assets/images/logo.svg";

type Props = {
    openSearch: () => void
};

const HeaderComponent = (props: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
             <Logo width={350} height={40} />
            {/* <TouchableOpacity onPress={props.openSearch} style={styles.searchBar}>
                <Text style={styles.searchTxt}>Tìm kiếm sản phẩm</Text>
                <FontAwesome name="search" size={20} color={CommonColors.gray} />
            </TouchableOpacity> */}
        </View>
    )
}

const styles = HeaderStyle;

export default HeaderComponent;