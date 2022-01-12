import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthRootTabParamList } from '../../routes/auth.tab.routes';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import * as Yup from 'yup';
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
import { Button } from '../../components/Button';

type Props = BottomTabScreenProps<AuthRootTabParamList, 'AuthRoutesStack'>;

export function Profile({ navigation }: Props) {
  const { user, signOut, updateUser } = useAuth();
  const [options, setOptions] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?', 
      'Lembre-se, que se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        }, 
        {
          text: 'Sair',
          onPress: () => signOut(),
        }
      ]
    )
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOptions(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });
    if(result.cancelled) 
      return;
    if(result.uri) 
      setAvatar(result.uri);
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é Obrigatória'),
        name: Yup.string()
        .required('Nome é obrigatório')
      });
      const data = { name, driverLicense };
      await schema.validate(data);
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });
      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if(error instanceof Yup.ValidationError)
        Alert.alert('Opa', error.message);
      else 
        Alert.alert('Não foi possível atualizar o perfil');
    }
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
              { !!avatar && <Photo source={{ uri: avatar}} /> }
              <PhotoButton onPress={handleAvatarSelect}>
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
                    onChangeText={setName}
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
                    onChangeText={setDriverLicense}
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
            <Button 
              title='Salvar Alterações'
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}