import {
  Button,
  FrameHandler
} from 'frog'
import { CustomFrameContext } from './index.js'
import {
  backgroundStyles,
  coinerStyles,
  // colors,
  headerStyles,
  headerTextDataStyles,
  headerTextStyles,
  qContainerStyles,
  qDataStyles,
  qStyles,
  screenStyles,
  similarQsStyles
} from '../../styles.js'
import {
  // getQByDoc,
  queryForSimilar
} from '../../api/db/bagel.js'
import { Q, QQueryResponse } from '../../api/db/types.js'
import { State } from './index'
import { getOrCreateUser, getReceivedDirectQs } from '../../api/db/d1.js'
import { qbaseVersion } from '../../api/db/bagel.js'


export const amaConfirmScreen: FrameHandler = async (c: CustomFrameContext) => {
  //// frame data ////
  const { inputText, frameData, buttonValue, deriveState, previousState } = c
  const qfid = frameData?.fid as number

  // truncate text, or respond that text is too long. max input same as cast?
  let truncatedText = inputText?.length && inputText?.length > 325
    ? inputText.substring(0, 322) + '...'
    : inputText

  //// userDB ////
  let asker = await getOrCreateUser(qfid, c.env.DB)
  let recipient = await getOrCreateUser(previousState.fid, c.env.DB)


  //// uniqueness ////
  // search bagelDB for q, then use similars to search postgres for userQs to same recipient
  const qSimilars: QQueryResponse = await queryForSimilar(inputText as string, c.env)
  const nearestSimilarDistance = qSimilars.distances && qSimilars.distances[0][0] as number
  const nearestSimilarQ = (qSimilars.metadatas && qSimilars.metadatas[0][0]) as unknown as Q

  // check for previous qs
  type coinedStatus = 'yes' | 'no' | 'maybe'
  let alreadyCoined: coinedStatus
  if (nearestSimilarDistance == null) {
    console.log('nearest similar from bagel was null')
    alreadyCoined = 'no'
  }
  else if (nearestSimilarDistance > .99) {
    alreadyCoined = 'yes'
  } else if (nearestSimilarDistance > .7) {
    alreadyCoined = 'maybe'
  } else {
    alreadyCoined = 'no'
  }

  // log vars to state
  deriveState(previousState => {
    let newState: State = previousState as State
    newState.q = inputText as string
    newState.id = recipient.id
    if (buttonValue == 'anon') newState.anon = true
    if (alreadyCoined == 'yes') newState.qid = nearestSimilarQ.id
  })

  let unique
  let alreadyAsked: boolean = false
  // let similarReceivedQs: string[] = []

  // if not coined, not asked
  if (alreadyCoined == 'no') {
    unique = <text>this q is new</text> // necessary here?
  } else {
    const receivedQs = await getReceivedDirectQs(recipient.id, c.env.DB)
    for (let j = 0; j < receivedQs.length; j++) {
      const receivedQ = receivedQs[j]
      // if q already asked, push to similarReceivedQs, set alreadyAsked to true
      if (receivedQ.q_id == nearestSimilarQ.id) {
        alreadyAsked = true
      }
      // but what if its just similar?
    }

    if (alreadyAsked) {
      unique = <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        <text
          style={{
            ...coinerStyles
          }}
        >
          asked by {nearestSimilarQ.coiner_name}
          <span style={{ fontSize: '1em', marginLeft: '6px' }}>({nearestSimilarQ.coiner_fid})</span>
        </text>
      </div>
      // } else if (!alreadyAsked && similarReceivedQs.length) {
      //   unique = <div
      //     style={{
      //       display: 'flex',
      //       flexDirection: 'column'
      //     }}
      //   >
      //     <text>already asked:</text>
      //     {similarReceivedQs.map((doc) => {
      //       let truncatedQ = doc.length > 58
      //         ? doc.substring(0, 54) + '...'
      //         : doc
      //       return (
      //         <text>{truncatedQ}</text>
      //       )
      //     })}
      //   </div>
    }
  }


  //// conditional intents ////
  const intents = alreadyAsked
    ? [
      <Button.Reset>edit</Button.Reset>,
      <Button action='/:profileName/qs'>see qs</Button>
    ]
    // : !alreadyAsked && similarReceivedQs.length
    //   ? [
    //     <Button.Reset>edit</Button.Reset>,
    //     <Button action="/:profileName/success">submit</Button>,
    //     <Button action='/:profileName/qs'>see qs</Button>
    //   ]
    : [
      <Button.Reset>edit</Button.Reset>,
      <Button action="/:profileName/success">submit</Button>,
      <Button action='/:profileName/qs'>see qs</Button>
    ]


  // const profileColor = statefulState.anon == false
  //   ? colors.fcPurple
  //   : colors.anonRed

  // let buttonIntents = [
  //   <Button action=":fid/qSuccess" value={buttonValue}>Submit</Button>,
  //   <Button.Reset>Edit</Button.Reset>
  // ]

  // const seeAnswers = <Button action="/ama/" value="private">See Answers</Button>
  // // if (alreadyAnswered == 'yes') buttonIntents.push(seeAnswers) + remove submit
  const qFontSize: string = truncatedText
    ? truncatedText.length < 30
      ? '6em'
      : truncatedText.length < 120
        ? '5em'
        : '4em'
    : ''

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
              fontSize: qFontSize
            }}
          >
            {truncatedText}
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
              ...similarQsStyles
            }}
          >
            {unique}
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
              ...headerTextStyles,
              fontSize: '2em'
            }}
          >
            <text style={{ marginBottom: '10px' }}>
              Your points: {asker.points_balance || '0'} {/* TODO make row of columns, add cost */}
            </text>
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
    imageOptions: { width: 1200, height: 1200 },
    imageAspectRatio: '1:1',
    intents: intents
  })
}