import {
  FrameContext,
  Frog,
  TransactionContext
} from 'frog'
import { getFont } from '../../fonts'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { D1Database } from '@cloudflare/workers-types'
import { coinHomeScreen } from './home'
import { coinCheckScreen } from './check'
import { coinSuccessScreen } from './success'
import { coinedQsScreen } from './qs'
// import { Ai } from '@cloudflare/ai'
import { Env } from '../..'
import { AIRSTACK_API_KEY } from '../../api/airstack/key'

// import { neynar } from 'frog/hubs'

export type State = {
  q: string,
  qCount: number
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
    qCount: -1
  }
})

app.frame('/', coinHomeScreen)
app.frame('/check', coinCheckScreen)
app.frame('/success', coinSuccessScreen)
app.frame('/coinedQs', coinedQsScreen)

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