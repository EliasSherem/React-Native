import React, { useCallback, useState, useMemo } from "react";
import { StyleSheet, View, ScrollView, Alert, Image } from "react-native";
import Constants from "expo-constants";

import { createAndSavePDF } from "./utils/helpers";
import Button from "./components/Button";
import CustomSwitch from "./components/CustomSwitch";
import CustomText from "./components/CustomText";
import { COLORS, IMAGES } from "./utils/constants";
import {
  simpleHtml,
  htmlWithBrokenSections,
  htmlWithImage,
  htmlWithPickedImage,
} from "./utils/html";

const createPdf = (htmlFactory) => async () => {
  try {
    const html = await htmlFactory();
    if (html) {
      await createAndSavePDF(html);
      Alert.alert("Success!", "Document has been successfully saved!");
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Something went wrong...");
  }
};

export default function AppContainer() {
  const [loadingKey, setLoadingKey] = useState(null);
  const pageMarginState = useState(false);
  const avoidSectionBreakingState = useState(false);
  const useImageFromAssetsState = useState(false);
  const useCameraState = useState(false);
  const optimizeImageState = useState(false);

  const onButtonPress = useCallback(
    (key, action) => async () => {
      try {
        if (action) {
          setLoadingKey(key);
          await action();
          setLoadingKey(null);
        }
      } catch (error) {
        setLoadingKey(null);
      }
    },
    []
  );

  const toggleSwitch = useCallback(
    (toggler) => () => toggler((previousState) => !previousState),
    []
  );

  const allButtons = useMemo(
    () => [
      {
        //title: "Simple PDF",
        action: createPdf(simpleHtml(pageMarginState[0])),
        //switches: [{ label: "Remove page margin", state: pageMarginState }],
      },
    ],
    [
      pageMarginState
    ]
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonsContainer}>
          {allButtons.map(({ title, action, switches }, index) => {
            const key = String(index);

            return (
              <View key={key} style={styles.exampleContainer}>
                <CustomText bold style={styles.exampleTitle}>
                  {title}
                </CustomText>
                {!!switches &&
                  !!switches.length &&
                  switches.map(({ state, label }, i) => (
                    <CustomSwitch
                      key={String(i)}
                      label={label}
                      onValueChange={toggleSwitch(state[1])}
                      value={state[0]}
                      disabled={!!loadingKey}
                    />
                  ))}
                <Button
                  disabled={!!loadingKey}
                  isLoading={loadingKey === key}
                  title="Create PDF"
                  onPress={onButtonPress(key, action)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    width: "100%",
  },
  buttonsContainer: {
    paddingHorizontal: 15,
  },
  exampleContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.black,
  },
  exampleTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
});