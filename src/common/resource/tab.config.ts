import { TabScreen } from "./global";

const tintColorLight = '#0095ff';
const tintColorDark = '#fff';

export class TabConfig {
    static colorTabs = {
        light: {
            text: '#11181C',
            background: '#fff',
            tint: tintColorLight,
            icon: '#687076',
            tabIconDefault: '#9BA1A6',
            tabIconSelected: tintColorLight,
        },
        dark: {
            text: '#ECEDEE',
            background: '#151718',
            tint: tintColorDark,
            icon: '#9BA1A6',
            tabIconDefault: '#9BA1A6',
            tabIconSelected: tintColorDark,
        },
    }

    static screenTabs: TabScreen[] = [
        { name: 'notification/index', title: 'Thông báo', icon: 'bell' },
        { name: 'setting/index', title: 'Cài đặt', icon: 'user' },
    ]
};
