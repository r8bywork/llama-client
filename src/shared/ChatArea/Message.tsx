// ```python print("Hello, World!") ``` example code block
import { v4 } from 'uuid';
import CodeBlock from '../CodeBlock/CodeBlock';
import TextBlock from '../TextBlock/TextBlock';
import styles from './styles/Message.module.scss';

export interface messageProps {
  text: string;
  sender: string;
  date: Date;
}
const Message = ({ text, sender, date }: messageProps) => {
  // test
  // const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/gm;
  // const codeBlockRegex = /`{0,3}([a-zA-Z]*)?\n([\s\S]*?)\n`{0,3}/g;
  // const codeBlockRegex = /`{0,3}\s*([a-zA-Z]*)?\n([\s\S]*?)\n*`{0,3}/g;
  // const codeBlockRegex = /`{0,3}\s*([a-zA-Z]*)?\n([\s\S]*?)\n?\s*`{0,3}/g;
  // const codeBlockRegex = /`{0,3}\s*([a-zA-Z]*)?\n([\s\S]*?)\n\s*`{0,3}/g;

  // good
  const codeBlockRegex = /`{1,3}([\s\S]*?)`{1,3}/gm;
  const parts = text.split(codeBlockRegex).filter(Boolean);
  return (
    <div className={styles.message}>
      <div className={styles.messageInfo}>
        {sender} {date.toLocaleString('ru-RU')}
      </div>
      {parts.map((part, index) => {
        const language = parts[index - 1];
        switch (index % 2) {
          case 1:
            return (
              <CodeBlock
                key={v4()}
                language={language}
                code={part}
              />
            );
          default:
            return (
              <TextBlock
                key={v4()}
                line={part}
              />
            );
        }
      })}
    </div>
  );
};

export default Message;
