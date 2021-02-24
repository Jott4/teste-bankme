const formatterXml = async (files: Array<File>) => {
  const returnArray = Promise.all(
    files.map(async (file) => {
      if (!file.type.includes("xml")) {
        alert(`o arquivo ${file.name} não é um xml`);
        return;
      }
      let parser = new DOMParser();
      let xmlText = await file.text();
      let xmlDoc = parser.parseFromString(xmlText, "text/xml");

      let emitterInfo = xmlDoc.getElementsByTagName("emit")[0].childNodes;
      let emitterCNPJ, emitterName;
      emitterInfo.forEach((item) => {
        if (item.nodeName === "CNPJ") {
          emitterCNPJ = item.textContent;
        }
        if (item.nodeName === "xNome") {
          emitterName = item.textContent;
        }
      });

      let receiverInfo = xmlDoc.getElementsByTagName("dest")[0].childNodes;
      let receiverCNPJ, receiverName;
      receiverInfo.forEach((item) => {
        if (item.nodeName === "CNPJ") {
          receiverCNPJ = item.textContent;
        }
        if (item.nodeName === "xNome") {
          receiverName = item.textContent;
        }
      });

      let emissionDate = xmlDoc.getElementsByTagName("dhEmi")[0].textContent;
      let amount = xmlDoc.getElementsByTagName("vNF")[0].textContent;
      return {
        emitterName,
        emitterCNPJ,
        receiverName: receiverName,
        receiverCNPJ: receiverCNPJ,
        emissionDate,
        amount,
      };
    })
  );
  console.log(returnArray);
  return returnArray;
};

export default formatterXml;
