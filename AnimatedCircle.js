import React from 'react'
import { Text, View, StyleSheet, Dimensions, Button, Animated, Easing } from 'react-native'
import Constants from 'expo-constants'
import Svg, { Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const { width } = Dimensions.get('window')
const size = width - 32
const strokeWidth = 40
// const radius = (size - strokeWidth)
const circumference = 100 * 2 * Math.PI

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  }
})

class AnimatedArc extends React.Component {
  constructor () {
    super()
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  render () {
    const alpha = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.PI * 2]
    })
    const strokeDashoffset = Animated.multiply(alpha, 100)
    return (
      <View style={styles.container}>
        <Svg width={size} height={size}>
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r="100"
            fill="none"
            stroke="#2162cc"
            {...{ strokeWidth, strokeDashoffset }}
            strokeDasharray={`${circumference} ${circumference}`}
          />

        </Svg>
      </View>
    )
  }
}

export default AnimatedArc
