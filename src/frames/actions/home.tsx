import {
  Button,
  FrameHandler,
} from 'frog'
import {
  backgroundStyles,
  headerStyles,
  headerTextDataStyles,
  headerTextStyles,
  qContainerStyles,
  qDataStyles,
  qStyles,
  screenStyles,
} from '../../styles'
import { CustomFrameContext } from '.'
import { qbaseVersion } from '../../api/db/bagel'


export const actionsHomeScreen: FrameHandler = async (c: CustomFrameContext) => {
  return c.res({
    image: (
      <div
        style={{
          ...backgroundStyles,
          ...screenStyles
        }}
      >
        <div
          class={'qContainer'}
          style={{
            ...qContainerStyles
          }}
        >
          <h1
            class={'q'}
            style={{
              ...qStyles,
              fontSize: '64px'
            }}
          >
            aqtions have arrived
          </h1>
        </div>
        <div
          class={'dataContainer'}
          style={{
            ...qDataStyles,
          }}
        >
          <img
            height='100px'
            width='100px'
            src={'https://github.com/0xzoo/qbase/raw/623f56f617fc4c8a5b9d68d730bcac7a71a1fc77/public/icon.png'}
          />
        </div>
        <div
          class={'footer'}
          style={{
            ...headerStyles
          }}
        >
          <div
            style={{
              ...headerTextStyles,
              fontSize: '2em'
            }}
          >
          </div>
          <div
            style={{
              ...headerTextStyles,
              fontSize: '2em'
            }}
          >
            <text>qbase</text>
            <text
              style={{
                ...headerTextDataStyles
              }}
            >{qbaseVersion}</text>
          </div>
        </div>
      </div>
    ),
    imageOptions: { width: 1200, height: 630 },
    imageAspectRatio: '1:1',
    intents: [
      <Button.AddCastAction
        action='/coinToss'
        name='coin-toss'
        icon='question'
      >
        add coin-toss
      </Button.AddCastAction>
    ]
  })
}