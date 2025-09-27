import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import { useEffect } from 'react';

import './code-theme.css';

type Props = {
  code: string;
  lang: string;
};

export const CodeView = ({ code, lang }: Props) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: effect
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="m-0 rounded-none border-none bg-transparent p-2 text-xs">
      <code className={`language-${lang}`}>{code}</code>
    </pre>
  );
};
