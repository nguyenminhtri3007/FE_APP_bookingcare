import { StyleSheet } from 'react-native';
import { CommonColors } from '@/src/common/resource/colors';
import { Fonts } from '@/src/common/resource/fonts';

const SettingStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: CommonColors.black,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: Fonts.POPPINS_BOLD,
    color: CommonColors.black,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    color: '#000',
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: CommonColors.primary || '#0095ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  logoutButton: {
    marginTop: 70,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#d9534f',
    borderRadius: 8,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
  },
  editIcon: {
    marginLeft: 10,
    padding: 5,  // Thêm padding để tăng vùng có thể nhấn
  },
});

export default SettingStyle;
