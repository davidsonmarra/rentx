import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthRootTabParamList } from '../../routes/auth.tab.routes';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';
import { PasswordInput } from '../../components/PasswordInput';

type Props = BottomTabScreenProps<AuthRootTabParamList, 'AuthRoutesStack'>;

export function Profile({ navigation }: Props) {
  const [options, setOptions] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const theme = useTheme();
  const { user } = useAuth();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {

  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOptions(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton onPress={handleBack} color={theme.colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather 
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo source={{ uri: 'https://github.com/davidsonmarra.png'}} />
              <PhotoButton onPress={() => {}}>
                <Feather 
                  name='camera'
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{marginBottom: useBottomTabBarHeight()}}>
            <Options>
              <Option 
                onPress={() => handleOptionChange('dataEdit')} 
                active={options === 'dataEdit'}
              >
                <OptionTitle active={options === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option 
                onPress={() => handleOptionChange('passwordEdit')}
                active={options === 'passwordEdit'}
              >
                <OptionTitle active={options === 'passwordEdit'}>Trocar Senha</OptionTitle>
              </Option>
            </Options>
            {
              options === 'dataEdit' ? (
                <Section>
                  <Input 
                    iconName='user'
                    placeholder='Nome'
                    autoCapitalize='words'
                    autoCorrect={false}
                    defaultValue={user.name}
                  />
                  <Input 
                    iconName='mail'
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input 
                    iconName='credit-card'
                    placeholder='CNH'
                    keyboardType='numeric'
                    defaultValue={user.driver_license}
                  />
                </Section>
              ) : (
                <Section>
                  <PasswordInput
                    iconName='lock'
                    placeholder='Senha atual'
                  />
                  <PasswordInput
                    iconName='lock'
                    placeholder='Nova senha'
                  />
                  <PasswordInput
                    iconName='lock'
                    placeholder='Repetir Senha'
                  />
                </Section>
              )
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}