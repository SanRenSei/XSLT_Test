import { useState, useEffect } from 'react'
import './App.css'

let loadFile = async (fileName) => {
  let url = fileName;
  let res = await fetch(url, {
    method: 'get',
    headers: {}
  });
  let resBody = await res.text();
  return resBody;
}

//let xslFileList = ['Abbr_Codes.xsl', 'iso_State_Codes.xsl', 'N-PORT_fundInfo.xsl', 'N-PORT_generalInfo.xsl', 'N-PORT_schPortfolio.xsl', 'NPORT_Documents.XSL', 'NPORT_explanatoryNotes.xsl', 'NPORT_signature.xsl', 'NPORT-P_X01.xsl'];
let xslFileList = ['NPORT-P_X01.xsl'];
let xmlFileList = ['0000869392-23-000164.xml', '0000869392-23-002292.xml'];

let loadApp = async () => {
  let xmlContent = await loadFile(xmlFileList[0]);
  let xml = new DOMParser().parseFromString(xmlContent, 'text/xml');
  for (let i=0;i<xslFileList.length;i++) {
    const xsltProcessor = new XSLTProcessor();
    let xslContent = await loadFile(xslFileList[i]);
    const xslt = new DOMParser().parseFromString(xslContent, 'text/xml');
    xsltProcessor.importStylesheet(xslt);
    xml = xsltProcessor.transformToDocument(xml);
  }
  document.getElementById("appContainer").appendChild(xml.documentElement);
}

function App() {

  useEffect(() => {
    loadApp();
  });

  return (
    <div id="appContainer">
    </div>
  )
}

export default App
