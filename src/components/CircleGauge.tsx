
import * as React from 'react'
import styled from 'styled-components'

interface ICircleGauge {
  /** サイズ(横幅&縦幅) */
  size: number

  /** 達成率(%) */
  percent: number

  /** トータル数 */
  totalYells: number

  /** ポイントをうつ%の配列 */
  points?: number[]

  /** 色: ％を示すカラー @default #16a4b4*/
  percentageColor?: string

  /** 色: 有効じゃないグレーカラー @default #EBEBEB*/
  disabledColor?: string

  /** 色: 達成時のテキスト色 @default white*/
  achievementTextColor?: string

  /** 色: 未達成時のテキスト色 @default gray*/
  notAchievementTextColor?: string
}

/**
 * サークルゲージ
 * @returns Component
 */
const CircleGauge: React.FC<ICircleGauge> = ({
  size,
  percent,
  totalYells,
  points,
  percentageColor,
  disabledColor,
  achievementTextColor,
  notAchievementTextColor
}) => {
  const [png, setPng] = React.useState<string | null>(null)
  const CURRENT_CIRCLE_SIZE = 16
  const achievementColor = percentageColor || '#16a4b4'
  const notAchievementColor = disabledColor || '#EBEBEB'
  const enabledTextColor = achievementTextColor || 'white'
  const disabledTextColor = notAchievementTextColor || 'gray'
  const overedMax = percent >= 100

  //コンテキストを生成
  const canvasElem = document.createElement('canvas')
  canvasElem.width = size
  canvasElem.height = size
  const context = canvasElem.getContext('2d')!
  context.beginPath()

  const createCanvas = () => {

    const angleA = 360 * (percent / 100)
    const angleB = 360 * ((100 - percent) / 100)
    const circleCanvasSize = size / 2
    const position = circleCanvasSize


    // 達成円
    context.beginPath()
    context.arc(position, position, circleCanvasSize, (0 - 90) * Math.PI / 180, (angleA - 90) * Math.PI / 180, false)
    context.lineTo(circleCanvasSize, circleCanvasSize)
    context.fillStyle = achievementColor
    context.fill()

    // 未達成円
    const fillNotAchievementCircle = () => {
      context.beginPath()
      context.arc(position, position, circleCanvasSize, (angleA - 90) * Math.PI / 180, ((angleA + angleB) - 90) * Math.PI / 180, false)
      context.lineTo(circleCanvasSize, circleCanvasSize)
      context.fillStyle = notAchievementColor
      context.fill()
    }

    // 中心の円
    const fillCenterCircle = () => {
      const lineSize = 1
      const centerCircleSize = circleCanvasSize - (lineSize * 2)
      const centerPosition = position + (lineSize / 4)
      context.beginPath()
      context.arc(centerPosition, centerPosition, centerCircleSize, 0, Math.PI * 2, false)
      context.fillStyle = 'white'
      context.fill()
      return context
    }
    if (!overedMax) {
      fillNotAchievementCircle()
      fillCenterCircle()
    }
    setPng(canvasElem.toDataURL())
  }

  React.useEffect(() => {
    // 描画にアニメーションをつける
    window.requestAnimationFrame(createCanvas)
  }, [size, percent, achievementColor, disabledColor, overedMax, notAchievementColor])

  const rotate = (rate: number) => { return `rotate(${ 360 / (100 / rate) }deg)` }
  const boxStyle = (boxSize: number) => {
    return {
      width: boxSize,
      height: size + boxSize,
      top: -(boxSize / 2),
      right: size / 2 - boxSize + (boxSize / 2)
    }
  }

  const currentCircle = (
    <PointBox style={ {
      ...boxStyle(CURRENT_CIRCLE_SIZE),
      transform: rotate(percent)
    } } >
      <CurrentCyrcle style={ {
        width: CURRENT_CIRCLE_SIZE,
        height: CURRENT_CIRCLE_SIZE,
        backgroundColor: achievementColor
      } } />
    </PointBox>
  )

  // ポイント
  const renderPoint = (point: number) => {
    if (point === 100) {
      return null
    }
    const POINT_SIZE = 8
    return (
      <PointBox style={ {
        ...boxStyle(POINT_SIZE),
        transform: rotate(point)
      } } >
        <CurrentCyrcle style={ {
          width: POINT_SIZE,
          height: POINT_SIZE,
          backgroundColor: percent >= point ? achievementColor : notAchievementColor
        } } />
      </PointBox>
    )
  }

  return (
    <Warapper style={ { width: size, height: size } }>
      <CyrcleStroke alt='circleStroke' src={ png || '' } />
      <RateText
        style={ { color: overedMax ? enabledTextColor : disabledTextColor } }>
        { percent > 999 ? 999 : percent }
        <ParsentText>%</ParsentText>
      </RateText>
      { points?.map(point => renderPoint(point)) }
      { !overedMax && currentCircle }
      <TotalText
        style={ { color: overedMax ? enabledTextColor : disabledTextColor } }>
        { totalYells.toLocaleString() }
      </TotalText>
      <AchievementText
        style={ { color: overedMax ? notAchievementColor : disabledTextColor } }>
        達成率
      </AchievementText>
    </Warapper>
  )
}

export default CircleGauge


////////////////////////////////////
// STYLE
////////////////////////////////////

const Warapper = styled.div`
  position: relative;
`
const RateText = styled.p`
  margin: 0;
  font-size: 3.2rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const ParsentText = styled.span`
  margin: 0;
  font-size: 1rem;
`

const CyrcleStroke = styled.img`
`

const PointBox = styled.div`
  position: absolute;
  transition: transform 200ms ease;
`

const CurrentCyrcle = styled.div`
  border-radius: 50%;
`

const AchievementText = styled.p`
  font-size: 0.8rem;
  position: absolute;
  top: 0.2rem;
  left: 1.4rem;
`

const TotalText = styled.p`
  font-size: 0.8rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  text-align: center;
`
