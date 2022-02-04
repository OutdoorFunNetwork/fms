import { FC, ReactChildren, useState } from 'react';
import { createEditor, Selection } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

type MarkdnType = {
  body: string | undefined;
  children?: ReactChildren;
};


const deserialize = (body: string | undefined) => {
  if (body == null) return [];

  return body.split('\r\n').map((line: string) => {
    return {
      children: [{ text: line }]
    };
  });
}

const Markdwn: FC<MarkdnType> = ({ body }) => {
  const [editor] = useState(() => withReact<any>(createEditor()));
  const [value, setValue] = useState(deserialize(body));

  const handleKeystroke = (e: any) => {
    // Disables tabbing out of the content editor
    if (e.key === 'Tab') {
      e.preventDefault();
      editor.insertText('    ');
      console.log(Selection);
    }
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newVal: any) => setValue(newVal)}>
      <Editable
          className="postForm__body"
          onKeyDown={handleKeystroke}
        />
      </Slate>
  )
}

export default Markdwn;