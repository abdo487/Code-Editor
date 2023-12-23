export default {
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Editore</title>
    <link rel="stylesheet" href="./assets/main.css">
</head>
<body
    class="min-h-screen w-full flex flex-col items-center justify-center bg-slate-100"
>
    <div class="editor" id="editor">
        <h1 class="text-2xl font-bold text-center">Code Editor</h1>
        <p class="text-center text-gray-500">
            A simple code editor made with vanilla javascript
        </p>
    </div>
    <script src="./assets/app.js" type="module"></script>
</body>
</html>
`,
  css: `
@font-face {
    font-family: "Fira Code";
    src: url(./fontFamily/Fira/FiraCode-VariableFont_wght.ttf);
  }
  
  .code-editor * {
    font-family: "Fira Code";
  }
  .code-editor {
    --editor-primary-color: #092635;
    --editor-primary-darker-color: #a0c9f8;
    --editor-secondary-color: #1b4242;
    --editor-tertiary-color: #5c8374;
    --editor-quaternary-color: #9ec8b9;
  
    --scrollbar-thumb-color: #8aa9b3;
    --text-aria-box-shadow: inset 0 0px 20px rgba(0, 0, 0, 0.1);
  
    --keyword: #1f00d1;
    --symbol: #658a00;
    --word: #00175c;
    --string: #52995e;
    --attribute-l1: #5d641c;
    --attribute-l2: #849200;
    --methode: #045cff;
    --function: #df2727;
    --value: #ff9d00;
    --property: #ff9d00;
    --comment: #5c5c5c;
    --number: #ff9d00;
  
    --comment: #5c5c5c;
  
    width: 100%;
    max-height: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  }
  .editor-header {
    height: auto;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--editor-primary-darker-color);
    color: var(--editor-quaternary-color);
    border-radius: 3px 3px 0 0;
  }
  .editor-header .editor-name {
    font-size: 16px;
    font-weight: 600;
  }
  .editor-header .editor-language {
    font-size: 13px;
    font-weight: 600;
  }
  .editor-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .editor-action-switch-theme {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--editor-secondary-color);
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .icon-sun,
  .icon-moon {
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: var(--editor-quaternary-color);
    transition: all 0.3s ease;
  }
  .icon-sun {
    margin-top: -30px;
  }
  #theme-switch {
    display: none;
  }
  #theme-switch:checked ~ .icon-sun {
    margin-top: 0px;
  }
  .editor-action-copy {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    overflow: hidden;
  }
  .editor-action-copy .icon-copy {
    font-size: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .editor-action-copy .copied {
    display: flex;
    font-size: 13px;
    padding-right: 10px;
    max-width: 0px;
    opacity: 0;
    margin-right: -15px;
    transition: all 0.3s ease;
  }
  .editor-action-copy .copied-show {
    max-width: 100px;
    opacity: 1;
    margin-right: 0px;
    transition: all 0.3s ease;
  }
  
  .editor-container {
    width: 100%;
    max-height: calc(100% - 50px);
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    background-color: var(--editor-primary-color);
    border-radius: 0 0 3px 3px;
    overflow-y: auto;
  }
  .editor-container::-webkit-scrollbar,
  .editor-text-aria::-webkit-scrollbar {
    width: 20px;
    height: 20px;
    background-color: var(--editor-primary-color);
  }
  .editor-container::-webkit-scrollbar-track,
  .editor-text-aria::-webkit-scrollbar-track {
    background-color: var(--editor-primary-color);
  }
  .editor-container::-webkit-scrollbar-thumb,
  .editor-text-aria::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color);
    border: 5px solid var(--editor-primary-color);
    border-radius: 20px;
  }
  .editor-line-numbers-bar {
    min-width: 30px;
    padding: 10px 0;
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--editor-primary-color);
  }
  .editor-line-number {
    width: 100%;
    height: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--editor-tertiary-color);
  }
  .editor-text-aria {
    height: fit-content;
    width: 100%;
    padding: 10px 0px;
    background-color: var(--editor-primary-color);
    border: none;
    outline: none;
    resize: none;
    font-family: monospace;
    font-size: 13px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    overflow-x: auto;
    box-shadow: var(--text-aria-box-shadow);
  }
  .editor-line {
    width: 100%;
    display: flex;
    height: 20px;
    padding: 0px 10px;
    line-height: 20px;
    color: var(--editor-quaternary-color);
  }
  
  .keyword {
    color: var(--keyword);
  }
  .symbol {
    color: var(--symbol);
  }
  .word {
    color: var(--word);
  }
  .string {
    color: var(--string);
  }
  .value {
    color: var(--value);
  }
  .property {
    color: var(--property);
  }
  .attribute-l1 {
    color: var(--attribute-l1);
  }
  .attribute-l2 {
    color: var(--attribute-l2);
  }
  .methode {
    color: var(--methode);
  }
  .function {
    color: var(--function);
  }
  .comment {
    color: var(--comment);
  }
  .number{
      color: var(--number);
  }
`,
  javascript: `
import CodeEditor from "./CodeEditor/CodeEditor.js";
import sample from "./CodeEditor/sample.js";
const javascript = new CodeEditor(
    document.getElementById("js"),
    {
        name: "sample.py",
        code: sample.javascript,
        language: "javascript",
        theme: "dark"
    }
);
javascript.render();
`,
};
