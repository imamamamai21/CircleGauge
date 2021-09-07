
import * as React from 'react'
import styled from 'styled-components'
import CircleGauge from 'components/CircleGauge'

/**
 * サンプルページ
 * @returns Component
 */
const MainPage: React.FC = () => {

  const circleSize = 134
  const [percent, setPercent] = React.useState<number>(0)


  React.useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => p + 11)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <h1>Circle Gauge</h1>
      <CircleWarapper>
        <CircleGauge
          size={ circleSize }
          percent={ percent }
          totalYells={ 12345 }
          percentageColor='#ff2d55'
          disabledColor='rgba(68, 63, 95, 0.1)'
          notAchievementTextColor='#443f5f'
          points={ [20, 40, 60, 80] }
        />
        <CircleGauge
          size={ circleSize }
          percent={ 90 }
          totalYells={ 15000000 }
          percentageColor='#ff2d55'
          disabledColor='rgba(68, 63, 95, 0.1)'
          achievementTextColor='#161323'
          points={ [33, 66, 99, 100] }
        />
        <CircleGauge
          size={ circleSize }
          percent={ 80 }
          totalYells={ 15000000 }
          percentageColor='#ff8300'
          disabledColor='rgba(68, 63, 95, 0.1)'
        />
        <CircleGauge
          size={ circleSize }
          percent={ 100 }
          totalYells={ 15000000 }
          disabledColor='rgba(68, 63, 95, 0.1)'
          percentageColor='#ff2d55'
        />
        <CircleGauge
          size={ circleSize }
          percent={ 99.9 }
          totalYells={ 99999 }
          percentageColor='#ff2d55'
          disabledColor='rgba(68, 63, 95, 0.1)'
          notAchievementTextColor='#443f5f'
          points={ [20, 40, 60, 80] }
        />
        <CircleGauge
          size={ circleSize }
          percent={ 34 }
          totalYells={ 15000000 }
          percentageColor='#ff8300'
          disabledColor='rgba(68, 63, 95, 0.1)'
          achievementTextColor='#ccc'
          points={ [10, 20, 30, 40, 50, 60, 70, 80, 90] }
        />
        <CircleGauge
          size={ circleSize }
          percent={ 0.5 }
          totalYells={ 0 }
          percentageColor='#ff2d55'
          disabledColor='rgba(68, 63, 95, 0.1)'
          notAchievementTextColor='#443f5f'
          points={ [20, 40, 60, 80] }
        />
      </CircleWarapper>
    </div>
  )
}

export default MainPage

////////////////////////////////////
// STYLE
////////////////////////////////////

const CircleWarapper = styled.div`
  display: flex;
  > div {
    margin: 0.4rem;
  }
`