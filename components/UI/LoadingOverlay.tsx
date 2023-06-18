import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default LoadingOverlay;
