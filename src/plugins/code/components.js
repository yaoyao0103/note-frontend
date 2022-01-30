/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import CodeEditor from '@uiw/react-textarea-code-editor';

export default (editor, opts = {}) => {
    const dc = editor.DomComponents;
    const defaultType = dc.getType("default");
  
    dc.addType(opts.name, {
    isComponent: el => el.tagName === 'CodeEditor',
    model: {
		defaults: {
			// The tag name that will be used in the final code
			tagName: 'CodeEditor'
		}
	},
	view: {
		// eg. You can customize the tag in the canvas
		// By default, the view will use the same tag of the model
		tagName: 'div',
		onRender() {
			// What the user see in the canvas is totally up to you
			// it can be a simple image as a placeholder or
			// you can make it as much close to the original markup
			this.el.innerHTML = `<CodeEditor
            language="js"
            placeholder="Please enter JS code."
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />`;
		}
	}
  });
}