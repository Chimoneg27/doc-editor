import { useRef, useState } from "react";
import { Template, checkTemplate, getInputFromTemplate } from "@pdfme/common";
import { Viewer } from "@pdfme/ui";
import {
  getFontsData,
  getTemplateByPreset,
  generatePDF,
  getPlugins,
  readFile,
  cloneDeep,
} from "./helper";

const initTemplate = () => {
  let template: Template = getTemplateByPreset(localStorage.getItem('templatePreset') || "")
  try {
    const templateString = localStorage.getItem("template");
    if (!templateString) {
      return template;
    }
    const templateJson = JSON.parse(templateString)
    checkTemplate(templateJson);
    template = templateJson as Template;
  } catch {
    localStorage.removeItem("template");
  }
  return template;
};

function App() {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<Viewer | null>(null);
  const [prevUiRef, setPrevUiRef] = useState<Viewer | null>(null);

  const buildUi = () => {
    const template = initTemplate();
    let inputs = getInputFromTemplate(template);
    try {
      const inputsString = localStorage.getItem("inputs");
      if (inputsString) {
        const inputsJson = JSON.parse(inputsString);
        inputs = inputsJson;
      }
    } catch {
      localStorage.removeItem("inputs");
    }

    getFontsData().then((font) => {
      if (uiRef.current) {
        ui.current = new Viewer({
          domContainer: uiRef.current,
          template,
          inputs,
          options: {
            font,
            labels: { 'clear': '消去' },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
          },
          plugins: getPlugins(),
        });
      }
    });
  };

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
        if (ui.current) {
          ui.current.updateTemplate(
            Object.assign(cloneDeep(ui.current.getTemplate()), {
              basePdf,
            })
          );
        }
      });
    }
  };

  if (uiRef != prevUiRef) {
    if (prevUiRef && ui.current) {
      ui.current.destroy();
    }
    buildUi();
    setPrevUiRef(uiRef);
  }

  return (
    <div>
      <header className="flex items-center justify-between mx-4 text-sm">
      <strong className="font-bold">Viewer</strong>
       <span className="mx-4">:</span>
        <label className="w-44">
           Change BasePDF
         <input type="file" accept="application/pdf" onChange={onChangeBasePDF} className="mt-2" />
        </label>
        <button onClick={() => generatePDF(ui.current)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Generate PDF</button>
      </header>
      <div ref={uiRef} className="w-full h-screen" />
    </div>
  );
}

export default App;
