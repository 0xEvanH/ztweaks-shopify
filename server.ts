import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler, storefrontRedirect} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from '~/lib/context';

const STATIC_EXTENSIONS = new Set([
  'otf', 'ttf', 'woff', 'woff2',
  'mp4', 'webm', 'ogg', 'mov',
  'mp3', 'wav',
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg', 'ico',
  'css', 'js', 'map',
  'pdf', 'txt', 'xml', 'json',
]);

function isStaticAsset(request: Request): boolean {
  const url = new URL(request.url);
  const ext = url.pathname.split('.').pop()?.toLowerCase();
  return !!ext && STATIC_EXTENSIONS.has(ext);
}

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const mergedEnv: Env = {...process.env, ...env} as Env;
      console.log('ENV CHECK:', Object.keys(mergedEnv), !!mergedEnv.SESSION_SECRET);
      const hydrogenContext = await createHydrogenRouterContext(
        request,
        mergedEnv,
        executionContext,
      );

      const handleRequest = createRequestHandler({
        build: serverBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        if (isStaticAsset(request)) {
          return response;
        }

        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};