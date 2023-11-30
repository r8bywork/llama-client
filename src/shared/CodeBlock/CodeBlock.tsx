import SyntaxHighlighter from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={shadesOfPurple}
      customStyle={{
        padding: '25px',
        fontSize: '15px',
        borderRadius: '10px',
      }}
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
