import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { RootStackParamList } from '../../../routes/stack.routes';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';
import api from '../../../services/api';

type Props = StackScreenProps<RootStackParamList, 'SignUpSecondStep'>;

export function SignUpSecondStep({ navigation, route }: Props) {
  const { user } = route.params;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const theme = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm) 
      return Alert.alert('Informe a senha e a confimação');
    if(password != passwordConfirm)
      return Alert.alert('As senhas não são iguais');
    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta Criada!',
        message: 'Agora é só fazer login\ne aproveitar',
        nextScreenRoute: 'Splash'
      })
    }).catch(() => {
      Alert.alert('Ops', 'Não foi possível cadastrar');
    });    
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active/>
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}forma fácil e rápido
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>
          <Button 
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}