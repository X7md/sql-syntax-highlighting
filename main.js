import './style.css';
import { tags } from '@lezer/highlight';
import { minimalSetup, EditorView } from 'codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorState, Compartment } from '@codemirror/state';
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { keymap } from '@codemirror/view';

const languageConf = new Compartment();

new EditorView({
  doc: 'select ',
  extensions: [
    minimalSetup,
    keymap.of([{ key: 'Tab', run: acceptCompletion }]),
    languageConf.of(sql()),
    autocompletion({}),
  ],
  parent: document.querySelector('#code-text'),
});

const worker = new Worker(new URL('./worker.sql-wasm.js', import.meta.url));
worker.onmessage = () => {
  console.log('Database opened');
  worker.onmessage = (event) => {
    console.log(event.data); // The result of the query
  };
};
