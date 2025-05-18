import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Text,
  View,
} from 'react-native';

interface AIButtonProps {
  onPress: () => void;
}

const AIButton: React.FC<AIButtonProps> = ({ onPress }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const colorAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFA500', '#FF4500'], 
  });

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
        <View style={styles.content}>
          <Animated.Text style={[styles.label, { color: textColor }]}>
            Trợ lý AI
          </Animated.Text>
          <Image
            source={require('@/assets/images/ai-assistant.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 65,
    height: 85,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default AIButton;
