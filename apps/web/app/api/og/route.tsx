import { ImageResponse } from 'next/og';

import { Space2 } from '@/features/public/landing-page/assets/icons/space2';
import { NextJS } from '@/features/public/landing-page/assets/logos/nextjs-13';
import { ogImageSchema } from '@/lib/validation/og';

export const runtime = 'edge';

const interRegular = fetch(
  new URL('../../../assets/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL('../../../assets/fonts/CalSans-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const MAX_HEADING_LENGTH = 140;
const MAX_FONT_SIZE_LENGTH = 70;

// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export async function GET(req: Request) {
  try {
    const fontRegular = await interRegular;
    const fontBold = await interBold;

    const url = new URL(req.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));

    const heading =
      values.heading.length > MAX_HEADING_LENGTH
        ? `${values.heading.substring(0, MAX_HEADING_LENGTH)}...`
        : values.heading;

    const { mode } = values;

    const paint = mode === 'dark' ? '#fff' : '#000';
    const fontSize = heading.length > MAX_FONT_SIZE_LENGTH ? '50px' : '70px';

    return new ImageResponse(
      <div
        style={{
          color: paint,
          background:
            mode === 'dark'
              ? 'linear-gradient(90deg, #000 0%, #121 100%)'
              : 'white',
        }}
        tw="flex relative flex-col p-12 w-full h-full items-start"
      >
        <NextJS paint={paint} />

        <div tw="flex flex-col flex-1 py-10">
          <div
            style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            tw="flex text-xl uppercase font-bold"
          >
            {values.type}
          </div>
          <div
            style={{
              fontFamily: 'Cal Sans',
              fontWeight: 'bold',
              marginLeft: '-3px',
              fontSize,
            }}
            tw="flex leading-[1.1] font-bold tracking-tighter max-w-[700px] items-center"
          >
            {heading}
            <Space2 />
          </div>
        </div>

        <div tw="flex items-center w-full justify-between pt-5">
          <div
            style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            tw="flex text-xl"
          >
            turborepo-nextjs.vercel.app
          </div>
          <div
            style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            tw="flex items-center text-xl"
          >
            <svg fill="none" height="32" viewBox="0 0 48 48" width="32">
              <title>GitHub</title>
              <path
                d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                stroke={paint}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M18 36c-9.02 4-10-4-14-4"
                stroke={paint}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <div tw="flex ml-2">github.com/nass59/turborepo-nextjs</div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Cal Sans',
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch {
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}
