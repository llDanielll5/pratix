import * as ImagePicker from 'expo-image-picker'
import { Alert, Platform } from 'react-native'

const GetImage = async (): Promise<object | null> => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Desculpa!', 'precisamos de sua permissão para o app funcionar!')
    }
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1
  })
  if (!result.cancelled) {
    return result
  }
  return null
}
export default GetImage
