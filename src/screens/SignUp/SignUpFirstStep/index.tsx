import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PublicRootStackParamList } from '../../../routes/public.routes';
import * as Yup from 'yup';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

type Props = StackScreenProps<PublicRootStackParamList, 'SignUpFirstStep'>;

export function SignUpFirstStep({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatório'),
      });
      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch(error) {
      if(error instanceof Yup.ValidationError)
        Alert.alert('Opa', error.message)
    }   
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
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName='user'
              placeholder='Nome'
              autoCapitalize='characters'
              value={name}
              onChangeText={setName}
            />
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              value={email}
              onChangeText={setEmail}
            />
            <Input 
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button 
            title='Próximo'
            onPress={handleNextStep}
          />
        </Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}