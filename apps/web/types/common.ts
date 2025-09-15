import type { Metadata } from 'next';

export type LayoutProps = {
  children: React.ReactNode;
};

export type PageProps<T = string> = {
  params: Promise<{
    slug: T;
  }>;
};

export type StaticParams<T = string> = Array<{ slug: T }>;

export type PageMetadata = Promise<Metadata | null | object>;
