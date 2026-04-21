import * as serverBuild from 'virtual:react-router/server-build';
import { createRequestHandler, storefrontRedirect } from '@shopify/hydrogen';
import { createHydrogenRouterContext } from '~/lib/context';
import { existsSync } from 'fs';
import { join } from 'path';

declare const Bun: {
  file(staticPath: string): BodyInit | null | undefined; env: Record<string, string>
};

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
      const mergedEnv: Env = { ...(Bun.env as unknown as Env), ...env } as Env;

      const executionCtx: ExecutionContext = executionContext ?? {
        waitUntil: (promise: Promise<unknown>) => promise,
        passThroughOnException: () => { },
      };

      // Serve static assets from dist/client
      const url = new URL(request.url);
      // Check dist/client first, then public/
      const distPath = join(process.cwd(), 'dist/client', url.pathname);
      const publicPath = join(process.cwd(), 'public', url.pathname);

      if (existsSync(distPath)) {
        return new Response(Bun.file(distPath));
      }
      if (existsSync(publicPath)) {
        return new Response(Bun.file(publicPath));
      }

      const hydrogenContext = await createHydrogenRouterContext(
        request,
        mergedEnv,
        executionCtx,
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
      return new Response('An unexpected error occurred', { status: 500 });
    }
  },
};