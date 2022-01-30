/* eslint-disable import/no-anonymous-default-export */
import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useState } from 'react';
import Code from "./CodeEditor";
export default (editor, opts = {}) => {
    const bm = editor.BlockManager;
    const content = `<CodeEditor
    language="js"
    placeholder="Please enter JS code."
    padding={15}
    style={{
      fontSize: 12,
      backgroundColor: "#f5f5f5",
      fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
    }}
  />`;
    const style = `<style>
    .w-tc-editor, textarea {
        width: 100%;
        min-height: 100%;
        max-height: 200px;
    }

    </style>
    `;
    bm.add(opts.name, {
      label: `
      <i class="fa fa-code"></i>
      <div class="gjs-block-label">
        ${opts.label}
      </div> 
      `,
      category: opts.category,
      content: '',
    });
  };
  