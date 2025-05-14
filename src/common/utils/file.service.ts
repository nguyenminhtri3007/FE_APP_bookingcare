import { Buffer } from 'buffer';

export const bufferToBase64Url = (buffer: any): string | null => {
  try {
    if (!buffer || !buffer.data || !Array.isArray(buffer.data)) {
      console.log("Buffer không hợp lệ");
      return null;
    }
    const decoded = Buffer.from(buffer.data).toString();
    if (decoded.startsWith("data:image")) {
      return decoded;
    }
    return null;
  } catch (error) {
    console.error("Lỗi giải mã buffer:", error);
    return null;
  }
};