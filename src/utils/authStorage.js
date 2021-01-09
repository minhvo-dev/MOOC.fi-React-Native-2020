import AsyncStorage from "@react-native-community/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const jsonToken = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );

    return jsonToken ? JSON.parse(jsonToken) : undefined;
  }

  async setAccessToken(token) { 
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(token)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(
      `${this.namespace}:token`
    );
  }
}

export default AuthStorage;