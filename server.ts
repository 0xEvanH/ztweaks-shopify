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

const MIME_TYPES: Record<string, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogg: 'video/ogg',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  txt: 'text/plain',
  xml: 'application/xml',
  otf: 'font/otf',
  ttf: 'font/ttf',
  woff: 'font/woff',
  woff2: 'font/woff2',
};

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

      const url = new URL(request.url);

      // Serve files from /public (videos, images, fonts, etc.)
      const publicPath = join(process.cwd(), 'public', url.pathname);
      if (existsSync(publicPath) && !url.pathname.endsWith('/')) {
        const ext = url.pathname.split('.').pop()?.toLowerCase() ?? '';
        const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
        const isVideo = ['mp4', 'webm', 'mov', 'ogg'].includes(ext);

        return new Response(Bun.file(publicPath), {
          headers: {
            'Content-Type': contentType,
            // Only disable compression for videos — already compressed formats
            ...(isVideo && { 'Content-Encoding': 'identity' }),
            'Cache-Control': 'public, max-age=31536000',
          },
        });
      }

      // Serve built client assets from /dist/client
      const staticPath = join(process.cwd(), 'dist/client', url.pathname);
      if (existsSync(staticPath) && !url.pathname.endsWith('/')) {
        return new Response(Bun.file(staticPath));
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

      // ✅ Response is returned as-is — do NOT touch Content-Encoding here
      const response = await handleRequest(request);

      // Only decompress if actually gzip encoded
      const encoding = response.headers.get('Content-Encoding');
      if (encoding === 'gzip') {
        try {
          const buffer = await response.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          
          // Check gzip magic bytes before attempting decompress
          if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
            const { gunzipSync } = await import('zlib');
            const decompressed = gunzipSync(Buffer.from(buffer));
            const newHeaders = new Headers(response.headers);
            newHeaders.delete('Content-Encoding');

            return new Response(decompressed, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders,
            });
          }
        } catch (e) {
          // If decompression fails, fall through and return original
          console.error('Decompression failed:', e);
        }
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