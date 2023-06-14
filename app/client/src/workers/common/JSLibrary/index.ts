import lodashPackageJson from "lodash/package.json";
import momentPackageJson from "moment-timezone/package.json";
import jsPdfJson from "jspdf/package.json";

export type TJSLibrary = {
  version?: string;
  docsURL: string;
  name: string;
  accessor: string[];
  url?: string;
};

export const defaultLibraries: TJSLibrary[] = [
  {
    accessor: ["_"],
    version: lodashPackageJson.version,
    docsURL: `https://lodash.com/docs/${lodashPackageJson.version}`,
    name: "lodash",
  },
  {
    accessor: ["moment"],
    version: momentPackageJson.version,
    docsURL: `https://momentjs.com/docs/`,
    name: "moment",
  },
  {
    accessor: ["xmlParser"],
    version: "3.17.5",
    docsURL: "https://github.com/NaturalIntelligence/fast-xml-parser",
    name: "xmlParser",
  },
  {
    accessor: ["forge"],
    version: "1.3.0",
    docsURL: "https://github.com/digitalbazaar/forge",
    name: "forge",
  },
  {
    accessor: ["jspdf"],
    version: jsPdfJson.version,
    docsURL: `https://artskydj.github.io/jsPDF/docs/jsPDF.html`,
    name: "jspdf",
  },
  {
    accessor: ["autoTable"],
    version: "3.5.29",
    docsURL: `https://github.com/simonbengtsson/jsPDF-AutoTable`,
    name: "autoTable",
  },
];

export const JSLibraries = [...defaultLibraries];
export const libraryReservedIdentifiers = defaultLibraries.reduce(
  (acc, lib) => {
    lib.accessor.forEach((a) => (acc[a] = true));
    return acc;
  },
  {} as Record<string, boolean>,
);
