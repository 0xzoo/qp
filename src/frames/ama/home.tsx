import {
  Button,
  TextInput,
  FrameHandler,
} from 'frog'
import {
  amaStyles,
  avatarStyles,
  backgroundStyles,
  homeStyles,
} from '../../styles'
import { CustomFrameContext, State } from '.'
import { getProfileDataFromName } from '../../api/airstack/hub'
// import logo from '/icon.png'

type param = {
  profileName: string
}

export const amaHomeScreen: FrameHandler = async (c: CustomFrameContext) => {
  const { deriveState } = c
  const { profileName } = c.req.param() as unknown as param
  console.log('profileName', profileName)
  const { profileData, error } = await getProfileDataFromName(profileName)
  // TODO! if (error) return c.res(errorScreen("Sorry we couldn't find that user. Please check your spelling is correct in the url"))
  if (error) console.log('amaHomeError', error)
  const {
    fid,
    imageMed
  } = profileData
  deriveState(previousState => {
    let newState: State = previousState as State
    newState.fid = fid
  })
  return c.res({
    image: (
      <div
        style={{
          ...backgroundStyles,
          ...homeStyles
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%'
          }}
        >
          <img
            style={{ ...avatarStyles }}
            src={imageMed}
          />
          <div
            style={{
              ...amaStyles
            }}
          >
            <text style={{ margin: 0, padding: 0 }}>ask</text>
            <text style={{ margin: 0, padding: 0 }}>{profileName}</text>
            <text style={{ margin: 0, padding: 0 }}>anything</text>
          </div>
        </div>
      </div>
    ),
    imageOptions: { width: 1200, height: 630 },
    intents: [
      <TextInput placeholder="?" />,
      <Button action="/:profileName/confirm" value='id'>ask</Button>,
      <Button action='/:profileName/confirm' value='anon'>ask anon</Button>,
      <Button action='/:profileName/qs'>see qs</Button>
    ]
  })
}