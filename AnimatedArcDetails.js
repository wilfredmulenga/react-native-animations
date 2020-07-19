import React from 'react'
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import Constants from 'expo-constants'
import Svg, { Path, LinearGradient, Stop, Defs, Text } from 'react-native-svg'
import { BLACK } from './common/colors'
const AnimatedPath = Animated.createAnimatedComponent(Path)
const { PI, cos, sin } = Math
const Angle = PI + PI * 0.4
const startAngle = PI + PI * 0.2
const endAngle = 2 * PI - PI * 0.2
const { width } = Dimensions.get('window')
const size = (width - 32)
const cx = size / 2
const cy = size / 2
const strokeWidth = 40
const r = (size - strokeWidth) / 2
const startX = cx - r * cos(startAngle)
const startY = -r * sin(startAngle) + cy
const endX = cx - r * cos(endAngle)
const endY = -r * sin(endAngle) + cy
const d = `M ${startX} ${startY} A ${r} ${r} 0 1 0 ${endX} ${endY}`
const circumference = r * Angle
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: BLACK,
    padding: 10
  }
})
console.log('here', size)
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
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  render () {
    const alpha = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Angle * 0.8]
    })
    const strokeDashoffset = Animated.multiply(alpha, r)
    return (
      <View style={styles.container}>
        <Svg width={size} height={size} color="red">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0" stopColor="#f7cd46" />
              <Stop offset="1" stopColor="#ef9837" />
            </LinearGradient>
          </Defs>
          <Path
            stroke="url(#grad)"
            fill="none"
            {...{ strokeWidth, d }}
            strokeDasharray={`${circumference} ${circumference}`}
          />
          <Text
            x={size / 2}
            y={ size / 2 - 20 }
            textAnchor="middle"
            fontWeight="bold"
            fontSize="28"
            fill="#f7cd46">
              2.7
          </Text>
          <Text
            x={size / 2}
            y={ size / 2 + 5 }
            textAnchor="middle"
            fontSize="24"
            fill="#ef9837">
              GB
          </Text>
          <Text
            x={size / 2}
            y={ endY + 15 }
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            fill="#ef9837">
              DATA
          </Text>
          <AnimatedPath
            stroke="white"
            fill="none"
            {...{ strokeWidth, strokeDashoffset, d }}
            strokeDasharray={`${circumference} ${circumference}`}
          />
        </Svg>
      </View>
    )
  }
}

export default AnimatedArc
