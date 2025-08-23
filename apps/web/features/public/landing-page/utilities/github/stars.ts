import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';

type JsonResponse = {
  stargazers_count: number;
};

const getResponse = async () => {
  try {
    const response = await fetch(siteConfig.links.api_github, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!response?.ok) {
      return null;
    }

    return (await response.json()) as JsonResponse;
  } catch {
    return null;
  }
};

export const getGithubStars = async (): Promise<number | null> => {
  const response = await getResponse();

  if (!response?.stargazers_count) {
    return null;
  }

  return response.stargazers_count;
};
