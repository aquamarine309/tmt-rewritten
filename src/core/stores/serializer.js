import pako from "pako";

function gzipToStr(data) {
  const charData = window.atob(data).split("").map(item => item.charCodeAt(0));
  const binData = new Uint8Array(charData);
  return pako.inflate(binData, {
    to: "string"
  });
}

function strToGzip(data) {
  return window.btoa(String.fromCharCode.apply(
    null,
    pako.deflate(data, {
      gzip: true
    })
  ));
}

export const Serializer = {
  fileStart: "TheModdingTreeSaveFileAAA",
  fileEnd: "EndOfSaveFile",
  encode(str) {
    return `${this.fileStart}${
      strToGzip(str)
        .replace(/0/gu, "0a")
        .replace(/(\+)/gu, "0b")
        .replace(/(\/)/gu, "0c")
    }${this.fileEnd}`;
  },
  decode(str) {
    try {
      return JSON.parse(gzipToStr(
        str.slice(
          this.fileStart.length,
          -this.fileEnd.length
        ).replace(/0c/gu, "/")
          .replace(/0b/gu, "+")
          .replace(/0a/gu, "0")
      ));
    } catch {
      return undefined;
    }
  }
};