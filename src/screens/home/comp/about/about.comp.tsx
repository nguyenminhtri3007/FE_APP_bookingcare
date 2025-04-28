import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

const AboutVideo = () => {
  return (
    <View style={styles.container}>
      {/* Tiêu đề phía trên */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Truyền thông</Text>
        {/* Nếu sau này bạn muốn thêm nút 'Xem thêm', có thể thêm ở đây */}
      </View>

      {/* Video Youtube */}
      <View style={styles.videoContainer}>
        <WebView
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          source={{ uri: 'https://www.youtube.com/embed/qVQlc9fTbfk' }}
        />
      </View>

      {/* Đoạn giới thiệu */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Với 27 năm hình thành và phát triển, Bệnh viện Đại học Y Dược TPHCM là địa chỉ chăm sóc sức khỏe uy tín của hàng triệu người bệnh. Bệnh viện luôn nỗ lực phát huy những giá trị cốt lõi bền vững, đó là: TIÊN PHONG trong điều trị người bệnh, nghiên cứu khoa học, đào tạo và quản trị; THẤU HIỂU nỗi đau về thể xác lẫn tinh thần của người bệnh để đưa ra những giải pháp điều trị tối ưu; Giữ vững sự CHUẨN MỰC của người Thầy giáo – Thầy thuốc, luôn là tấm gương sáng để thế hệ tiếp nối noi theo; Quản lý chất lượng, đảm bảo AN TOÀN cho người bệnh và nhân viên y tế.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  videoContainer: {
    width: '100%',
    height: (width - 40) * 9 / 16,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  textContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#555',
  },
});

export default AboutVideo;
