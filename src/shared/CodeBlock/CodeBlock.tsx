import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={a11yDark}
      customStyle={{
        padding: '25px',
        fontSize: '15px',
        borderRadius: '10px',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
