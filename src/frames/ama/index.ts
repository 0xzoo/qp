import {
  FrameContext,
  Frog,
  TransactionContext
} from 'frog'
import { getFont } from '../../fonts'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { amaHomeScreen } from './home'
import { amaConfirmScreen } from './confirm'
import { amaSuccessScreen } from './success'
import { amaQsScreen } from './qs'
import { Env } from '../..'
import { AIRSTACK_API_KEY } from '../../api/airstack/key'


export type State = {
  q: string,
  qid: string | null,
  currentQ: number,
  anon: boolean,
  id: number,
  fid: number
}

type FrogOptions = {
  Bindings: Env,
  State: State
}

export type CustomFrameContext = FrameContext<FrogOptions>
export type CustomTransactionContext = TransactionContext<FrogOptions>

export const app = new Frog<FrogOptions>({
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": AIRSTACK_API_KEY,
      }
    }
  },
  assetsPath: '/assets',
  imageOptions: async () => {
    const helvetica = await getFont(400)
    const helveticaBold = await getFont(500)
    const helveticaBlack = await getFont(600)

    return {
      fonts: [helvetica, helveticaBold, helveticaBlack]
    }
  },
  initialState: {
    q: '',
    qid: null,
    currentQ: -1,
    anon: false,
    id: 0,
    fid: 0
  }
})

app.frame('/:profileName', amaHomeScreen)
app.frame('/:profileName/confirm', amaConfirmScreen)
app.frame('/:profileName/success', amaSuccessScreen)
app.frame('/:profileName/qs', amaQsScreen)

const isCloudflareWorker = typeof caches !== 'undefined'
if (isCloudflareWorker) {
  // @ts-ignore
  const manifest = await import('__STATIC_CONTENT_MANIFEST')
  //
  const serveStaticOptions = { manifest, root: './' }
  app.use('/*', serveStatic(serveStaticOptions))
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions })
} else {
  devtools(app, { serveStatic })
}

export default app
