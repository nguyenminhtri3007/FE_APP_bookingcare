import { UserModel } from "@/src/data/model/user.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AppConfig {
    private domain = "http://192.168.42.6:8080/api";
    private preImage = "http://192.168.22.17:8080/api";

    constructor() { }

    getDomain() {
        return this.domain;
    }

    getPreImage() {
        return this.preImage;
    }

    async setUserId(user_id: number){
        await AsyncStorage.setItem('user_id', JSON.stringify(user_id));
    }

    async getUserId(){
        try {
            const userInfo = await AsyncStorage.getItem('user_id');
            if (userInfo) {
                return JSON.parse(userInfo) as number;
            }

            return 0;
        } catch (error) {
            throw error;
        }
    }

    async getUserInfo() {
        try {
            const userInfo = await AsyncStorage.getItem('user_Info');
            if (userInfo) {
                return JSON.parse(userInfo);
            }

            return {};
        } catch (error) {
            throw error;
        }
    }

    async setUserInfo(userInfo: UserModel) {
        try {
            await AsyncStorage.setItem('user_Info', JSON.stringify(userInfo));
        } catch (error) {
            throw error;
        }
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem('access-token');
        if (!accessToken) {
            return null;
        }

        return accessToken;
    }

    async setAccessToken(token: string) {
        try {
            await AsyncStorage.setItem('access-token', token);
        } catch (error) {
            console.log(error);
        }
    }

    async getRefreshToken() {
        const accessToken = await AsyncStorage.getItem('refresh-token');
        if (!accessToken) {
            return null;
        }

        return accessToken;
    }

    async setRefreshToken(token: string) {
        try {
            await AsyncStorage.setItem('refresh-token', token);
        } catch (error) {
            console.log(error);
        }
    }

    async clear() {
        await AsyncStorage.clear();
    }
}