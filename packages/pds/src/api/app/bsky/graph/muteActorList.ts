import { Server } from '../../../../lexicon'
import AppContext from '../../../../context'

export default function (server: Server, ctx: AppContext) {
  const { appViewAgent } = ctx
  if (!appViewAgent) return
  server.app.bsky.graph.muteActorList({
    auth: ctx.authVerifier.access,
    handler: async ({ auth, input }) => {
      const requester = auth.credentials.did

      await appViewAgent.api.app.bsky.graph.muteActorList(input.body, {
        ...(await ctx.appviewAuthHeaders(requester)),
        encoding: 'application/json',
      })
    },
  })
}
