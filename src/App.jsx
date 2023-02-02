import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import Content from './Components/Content';

function App() {

  const [html, sethtml] = useState(
    `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible"  content="ie=edge">
        <title>HTML 5 Boilerplate</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    `
  )
  const [css, setcss] = useState(`
    body {
      color: #000;
      height:100%;
    }`)
  const [js, setjs] = useState(
    `document.body.style.backgroundColor = "gray"`
  )
  const [code, setCode] = useState('')
  const [mode, setMode] = useState("Light")

  useEffect(() => {
    const timer = setTimeout(() => {
      setCode(`
          <html>${html}</html>
          <style>${css}</style>
          <script>${js}</script>
        `)
        localStorage.setItem("html",html);
        localStorage.setItem("css",css);
        localStorage.setItem("js",js);
    }, 300)
    
    return () => clearTimeout(timer)
  }, [html, css, js])

  return (
    <div className="App">
      <div>
        <p style={{textAlign:"center","fontSize":"20px","marginTop":"20px","fontWeight":"bold"}}>Designer's Den</p>
        <Content/>
      </div>
      <div className="title">
        <div id="html">HTML</div>
        <div id="css">CSS</div>
        <div id="js">JS</div>
      </div>
      <div className="Editor">
        <Editor
          value={html}
          onValueChange={html => sethtml(html)}
          highlight={html => highlight(html, languages.html)}
          padding={5}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "50%",
            "border": "1px solid white",
          }}
        />
        <Editor
          value={css}
          onValueChange={css => setcss(css)}
          highlight={css => highlight(css, languages.css)}
          padding={5}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "30%",
            "border": "1px solid white",
          }}
        />
        <Editor
          value={js}
          onValueChange={js => setjs(js)}
          highlight={js => highlight(js, languages.js)}
          padding={5}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "30%",
            "border": "1px solid white",
          }}
        />
      </div>
      <div className="outputScreen">
        <iframe title="output" srcDoc={code}
          sandbox="allow-scripts" width="100%" height="100%"></iframe>
      </div>
    </div>
  );
}
export default App
