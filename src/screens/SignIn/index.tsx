import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PublicRootStackParamList } from '../../routes/public.routes';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

type Props = StackScreenProps<PublicRootStackParamList, 'SignIn'>;

export function SignIn({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const theme = useTheme();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
      await schema.validate({email, password});
      signIn({email, password});
    } catch(error) {
      if(error instanceof Yup.ValidationError) 
        Alert.alert('Opa', error.message)
      else 
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>Faça seu login para começar{'\n'}uma experiência incrível.</SubTitle>
          </Header>
          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button 
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button 
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              light
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}