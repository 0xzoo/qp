import {
  Button,
  FrameHandler
} from 'frog'
import {
  backgroundStyles,
  coinerStyles,
  headerStyles,
  // headerTextDataStyles,
  headerTextStyles,
  qContainerStyles,
  qDataStyles,
  qStyles,
  screenStyles,
  similarQsStyles
} from '../../styles'
import {
  getQById,
} from '../../api/db/bagel'
import { CustomFrameContext, State } from './index'
import { GetQResponse, Q } from '../../api/db/types'
import { getReceivedDirectQs } from '../../api/db/d1'
// import { tokenize } from '../../api/llm/tokenize'


export const amaQsScreen: FrameHandler = async (c: CustomFrameContext) => {

  //// frame data ////
  const { deriveState, buttonValue, previousState } = c
  // state //
  const { id } = previousState
  const receivedQs = await getReceivedDirectQs(id, c.env.DB)
  const qCount = receivedQs.length
  const state = deriveState(previousState => {
    let newState: State = previousState as State
    if (buttonValue == 'back') {
      newState.currentQ++
    } else if (buttonValue == 'forward') {
      newState.currentQ--
    } else if (newState.currentQ < 0) {
      newState.currentQ = qCount
    }
  })
  const statefulState: State = state as State
  const finalQ = statefulState.currentQ == 1
  // console.log('qCount', qCount)
  // console.log('count', statefulState.qCount)
  // console.log('finalQ', finalQ)

  //// get Q and count from bagelDB ////
  const qid = Number(receivedQs[statefulState.currentQ].q_id)
  const qResponse: GetQResponse = await getQById(qid, c.env, false)
  const qMetadata = qResponse.metadatas && qResponse.metadatas[0]
  if (!qMetadata) {
    console.log('id', qResponse.documents && qResponse.documents[0])
    // throw new Error('trouble reaching DB')
  }
  const {
    coiner_name,
    coiner_fid,
  } = qMetadata as Q
  const q = qMetadata?.['bagel:document'] as string


  //// build intents ////
  let intents = []
  const urlMain = `https://qbase.crypt0z00.workers.dev/q/${statefulState.currentQ}/img.png`
  const linkUrl = `https://warpcast.com/~/compose?text=a%3A/&embeds[]=${urlMain}`

  if (statefulState.currentQ < qCount) intents.push(
    <Button action='/coinedQs' value='back'>←</Button>)
  if (!finalQ) intents.push(<Button action='/coinedQs' value='forward'>→</Button>)
  intents.push(
    <Button.Reset>back</Button.Reset>,
    <Button.Link href={linkUrl}>answer</Button.Link>
  )

  const qFontSize: string = q.length < 30
    ? '6em'
    : q.length < 120
      ? '5em'
      : '4em'

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
            ...qContainerStyles,
            paddingTop: '60px'
          }}
        >
          <h1
            class={'q'}
            style={{
              ...qStyles,
              fontSize: qFontSize
            }}
          >
            {q}
          </h1>
        </div>
        <div
          class={'dataContainer'}
          style={{
            ...qDataStyles,
          }}
        >
          <div
            class={'data'}
            style={{
              ...similarQsStyles,
            }}
          >
            <text
              style={{
                ...coinerStyles
              }}
            >
              coined by {coiner_name}
              <span style={{ fontSize: '.5em', marginLeft: '6px' }}>({coiner_fid})</span>
            </text>
          </div>
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
              ...headerTextStyles
            }}
          >
            <text>{Date.now()}</text>
          </div>
        </div>
      </div>
    ),
    imageOptions: { width: 1200, height: 1200 },
    imageAspectRatio: '1:1',
    intents: intents
  })
}

