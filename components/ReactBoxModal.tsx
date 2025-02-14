import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Platform,
  SafeAreaView,
} from "react-native";
// import React from "react";
import ReactModal, { Modal, SlideAnimation } from "react-native-modals";
import { BlurView } from "expo-blur";

interface IReactModal {
  onDismiss: () => void;
  onTouchOutside: () => void;
  visible?: boolean;
  children?: any;
  statementModalStyles?: any;
  type?: string;
  customStyles?: any;
}

const ReactBoxModal = ({
  onDismiss,
  onTouchOutside,
  visible,
  children,
  statementModalStyles,
  type,
  customStyles,
}: IReactModal) => {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ReactModal
        onDismiss={() => onDismiss()}
        onTouchOutside={() => onTouchOutside()}
        visible={visible}
        // overlayBackgroundColor="#000000"
        overlayBackgroundColor="rgba(13, 13, 14, 0)"
        onSwipeOut={() => onDismiss()}
        modalStyle={[
          type != "statement"
            ? { ...styles.modalStyles, width: width }
            : statementModalStyles,
        ]}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        animationDuration={300}
        hasOverlay={true}
        overlayOpacity={0.5}
        swipeDirection={"down"}
        swipeThreshold={0.5}
        useNativeDriver={true}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1, width: width }}
          onPress={() => {
            onDismiss();
          }}
        >
          <BlurView intensity={0} style={[styles.blurView, customStyles]}>
            {children}
          </BlurView>
        </TouchableWithoutFeedback>
      </ReactModal>
    </SafeAreaView>
  );
};

export default ReactBoxModal;

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 13, 14, 0.5)",
  },
  modalStyles: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 12,
    height: "100%",
    marginLeft: 16,
    marginRight: 16,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "b",
    marginBottom: 50,
    backgroundColor: "rgba(13, 13, 14, 0)",
  },
});
