import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import BackDrop from './BackDrop';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  snapTo: string;
  backgroundColor: string;
  children?: ReactNode;
};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetMethods, Props>(
  ({snapTo, backgroundColor, children}: Props, ref) => {
    const inset = useSafeAreaInsets();
    const {height, width} = Dimensions.get('screen');
    const closeHeight = height;
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeight);
    }, [topAnimation, openHeight]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(closeHeight);
    }, [topAnimation, openHeight]);

    useImperativeHandle(ref, () => ({expand, close}), [expand, close]);

    const animatedStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        console.log('========== BEGIN ==========');
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            stiffness: 400,
            damping: 100,
          });
        } else {
          topAnimation.value = withSpring(event.translationY + context.value, {
            damping: 100,
            stiffness: 400,
          });
        }

        console.log('========= Updating position =========');
        console.log(event.translationY);
      })
      .onEnd(() => {
        console.log('============= end ===========');
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            stiffness: 400,
            damping: 100,
          });
        }
      });

    return (
      <>
        <BackDrop
          close={close}
          closeHeight={closeHeight}
          openHeight={openHeight}
          topAnimation={topAnimation}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animatedStyle,
              {backgroundColor, paddingBottom: inset.bottom},
            ]}>
            <View style={styles.lineContainer}>
              <View style={styles.line}>{children}</View>
            </View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});
