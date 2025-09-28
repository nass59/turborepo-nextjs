const DATA = {
  title: 'Tech Blog',
  description:
    'Latest updates, articles, and insights about NextJS, React, Typescript, and more.',
} as const;

export const HomeHeading = () => (
  <>
    <h1 className="bg-clip-text font-bold text-4xl text-slate-200 tracking-tighter sm:text-3xl md:text-6xl lg:text-8xl">
      {DATA.title}
    </h1>
    <p className="bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-2xl text-transparent leading-10 tracking-tighter sm:text-xl">
      {DATA.description}
    </p>
  </>
);
