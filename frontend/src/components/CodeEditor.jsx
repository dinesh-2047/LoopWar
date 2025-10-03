import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { HTMLHint } from "htmlhint";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const lintTimerRef = useRef(null);
  const languageRef = useRef("javascript");

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here...\n");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState("");

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const handleEditorDidMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    setTimeout(() => {
  editor.layout();
}, 0);

    monacoRef.current = monacoInstance;

    monacoInstance.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    editor.onDidChangeModelContent(() => {
      if (lintTimerRef.current) clearTimeout(lintTimerRef.current);
      const delay = 300;
      lintTimerRef.current = setTimeout(() => {
        const current = editor.getValue();
        runLinting(current);
      }, delay);
    });
  };

  const setMarkers = (owner, markers) => {
    const model = editorRef.current?.getModel();
    if (!model || !monacoRef.current) return;
    monacoRef.current.editor.setModelMarkers(model, owner, markers);
  };

  const setErrorMarkers = (errors) => {
    const m = monacoRef.current;
    const model = editorRef.current?.getModel();
    if (!model || !m) return;

    const markers = errors.map((err) => ({
      startLineNumber: err.line || 1,
      startColumn: err.column || 1,
      endLineNumber: err.endLine || err.line || 1,
      endColumn: err.endColumn || (err.column || 1) + 1,
      message: err.message,
      severity: m.MarkerSeverity?.Error ?? 8,
    }));

    setMarkers("lint", markers);
  };

  const runLinting = (text) => {
    setMarkers("lint", []);

    if (languageRef.current === "html") {
      const results = HTMLHint.verify(text, {
        "tag-pair": true,
        "doctype-first": false,
        "title-require": false,
        "inline-style-disabled": false,
        "inline-script-disabled": false,
      });
      if (results.length) {
        setErrorMarkers(
          results.map((r) => ({
            line: r.line,
            column: r.col,
            message: r.message,
          }))
        );
      }
      return;
    }

    if (languageRef.current === "css") {
      const issues = [];
      if (!text.trim()) {
        issues.push({ line: 1, column: 1, message: "CSS is empty." });
      }
      const open = (text.match(/{/g) || []).length;
      const close = (text.match(/}/g) || []).length;
      if (open !== close) {
        issues.push({ line: 1, column: 1, message: "Unbalanced { } braces." });
      }
      if (issues.length) setErrorMarkers(issues);
      return;
    }
  };

  const runCode = async () => {
    setOutput("⏳ Running...");
    setRunning(true);
    setMarkers("lint", []);

    try {
      if (language === "javascript") {
        let capturedLogs = [];
        const originalLog = console.log;

        try {
          console.log = (...args) => {
            capturedLogs.push(args.join(" "));
            originalLog.apply(console, args);
          };

          const result = eval(code);

          if (capturedLogs.length > 0) {
            setOutput(capturedLogs.join("\n"));
          } else if (result !== undefined) {
            setOutput(String(result));
          } else {
            setOutput("✅ Code ran successfully (no output)");
          }
        } catch (err) {
          setOutput("❌ Error: " + err.message);
          setErrorMarkers([{ line: 1, column: 1, message: err.message }]);
        } finally {
          console.log = originalLog;
        }
      } else if (language === "html") {
  setHtmlPreview(code);

  const results = HTMLHint.verify(code, {
    "tag-pair": true,
    "doctype-first": false,
    "title-require": false,
    "inline-style-disabled": false,
    "inline-script-disabled": false,
  });

  if (results.length > 0) {
    const errorMessages = results
      .map(r => `❌ Error (line ${r.line}, col ${r.col}): ${r.message}`)
      .join("\n");
    const markers = results.map((r) => ({
      line: r.line,
      column: r.col,
      message: r.message,
    }));
    setErrorMarkers(markers);
    setOutput(errorMessages);  // <-- detailed errors in Output
  } else {
    setMarkers("lint", []);
    setOutput("✅ HTML looks good.");
  }
} else if (language === "css") {
  if (!code.trim()) {
    const error = { line: 1, column: 1, message: "CSS is empty" };
    setErrorMarkers([error]);
    setOutput(`❌ Error (line ${error.line}, col ${error.column}): ${error.message}`);
    setHtmlPreview(""); // clear preview when errors
  } else {
    const issues = [];
    const lines = code.split("\n");

    // Unbalanced braces
    const open = (code.match(/{/g) || []).length;
    const close = (code.match(/}/g) || []).length;
    if (open !== close) {
      issues.push({ line: 1, column: 1, message: "Unbalanced { } braces." });
    }

    // Missing semicolons + unknown props
    const knownProps = [
      "color","background","margin","padding","font-size","width","height",
      "border","display","position","flex","justify-content","align-items"
    ];
    lines.forEach((line, idx) => {
      const propMatch = line.match(/([a-zA-Z-]+)\\s*:/);
      if (propMatch) {
        if (!knownProps.includes(propMatch[1])) {
          issues.push({ line: idx + 1, column: 1, message: `Unknown property '${propMatch[1]}'` });
        }
        if (!line.trim().endsWith(";") && !line.trim().endsWith("{") && !line.trim().endsWith("}")) {
          issues.push({ line: idx + 1, column: 1, message: "Missing semicolon." });
        }
      }
    });

    if (issues.length) {
      setErrorMarkers(issues);
      const errorMessages = issues
        .map(i => `❌ Error (line ${i.line}, col ${i.column}): ${i.message}`)
        .join("\\n");
      setOutput(errorMessages);
      setHtmlPreview(""); // don't preview when errors exist
    } else {
      setMarkers("lint", []);
      setOutput("✅ CSS applied in preview.");
      setHtmlPreview(`<html><head><style>${code}</style></head><body>
        <h3>CSS Preview Area</h3>
        <p>This is a sample text styled with your CSS.</p>
        <button>Button Example</button>
      </body></html>`);
    }
  }
}


    } catch (err) {
      setOutput("❌ Error: " + err.message);
      setErrorMarkers([{ line: 1, column: 1, message: err.message }]);
    } finally {
      setRunning(false);
    }
  };

  const clearCode = () => {
    setCode(
      language === "html"
        ? "<!DOCTYPE html>\n<html>\n  <head><meta charset=\"utf-8\" /></head>\n  <body>\n  </body>\n</html>"
        : "// Write your code here...\n"
    );
    setOutput("");
    setMarkers("lint", []);
    setHtmlPreview("");
  };

  useEffect(() => {
    if (language === "html") setHtmlPreview(code);
    return () => {
      if (lintTimerRef.current) clearTimeout(lintTimerRef.current);
    };
  }, [code, language]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 rounded-2xl shadow-2xl overflow-hidden bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3">
        <div className="flex items-center gap-3">
          <h2 className="text-white text-lg font-semibold">💻 Code Editor</h2>
          <select
            className="bg-white text-black px-3 py-1 rounded-lg focus:outline-none font-medium"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={runCode}
            disabled={running}
            className={`px-4 py-2 rounded-lg font-medium text-white transition ${
              running
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-400"
            }`}
          >
            {running ? "⏳ Running..." : "▶ Run"}
          </button>
          <button
            onClick={clearCode}
            className="px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-400 transition"
          >
            🗑 Clear
          </button>
        </div>
      </div>

      {/* Editor & Preview */}
      {(language === "html" || language === "css") ? (
        <div className="flex gap-4 p-4 bg-gray-800 min-h-[400px]" >
          <Editor
            height="400px"
            language={language}
            value={code}
            onMount={handleEditorDidMount}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{ fontSize: 15, roundedSelection: true, automaticLayout: true }}
            className="flex-1 rounded-xl shadow-lg overflow-hidden"
          />
          <iframe
          key={htmlPreview}
            title="preview"
            sandbox="allow-scripts"
            style={{
              flex: 1,
              height: "400px",
              borderRadius: "1rem",
              border: "2px solid #ccc",
              backgroundColor: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
            srcDoc={htmlPreview}
          />
        </div>
      ) : (
        <div className="p-4 bg-gray-800">
          <Editor
            height="400px"
            language={language}
            value={code}
            onMount={handleEditorDidMount}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{ fontSize: 15, roundedSelection: true, automaticLayout: true }}
            className="rounded-xl shadow-lg overflow-hidden"
          />
        </div>
      )}

      {/* Output */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 font-mono text-sm rounded-b-2xl shadow-inner">
        <h3 className="font-semibold mb-2">Output:</h3>
        <pre className="whitespace-pre-wrap">
          {output || "⏳ Run your code to see output here"}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;