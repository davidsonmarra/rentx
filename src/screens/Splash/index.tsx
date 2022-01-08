import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PublicRootStackParamList } from '../../routes/public.routes';
import { CompositeScreenProps } from '@react-navigation/native';
import { AuthRootStackParamList } from '../../routes/auth.stack.routes';
import { useAuth } from '../../hooks/auth';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import {
  Container,
} from './styles';
import { StatusBar } from 'react-native';

type Props = CompositeScreenProps<
  StackScreenProps<PublicRootStackParamList, 'Splash'>,
  StackScreenProps<AuthRootStackParamList, 'Splash'>
>;

export function Splash({ route, navigation }: Props) {
  const { user } = useAuth();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate(user.id ? 'Home' : 'SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 2500 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </Container>
  );
}
