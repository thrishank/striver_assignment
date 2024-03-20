import { useState } from "react";
import { format } from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

const CodeFormatter = ({ codeString, language }) => {
  const [formattedCode, setFormattedCode] = useState("");

  const formatCodeString = () => {
    try {
      let plugins = [];
      let parser;

      switch (language) {
        case 93:
          plugins = [parserBabel];
          parser = "babel";
          break;
        case 91:
          plugins = [parserJava];
          parser = "java";
          break;
        case 52:
          plugins = [parserCpp];
          parser = "cpp";
          break;
        case 92:
          plugins = [parserPython];
          parser = "python";
          break;
        default:
          throw new Error("Unsupported language");
      }

      const formattedCode = format(codeString, {
        parser,
        plugins,
      });

      setFormattedCode(formattedCode);
    } catch (error) {
      console.error("Error formatting code:", error);
    }
  };

  return <td className="px-6 py-4">{formattedCode.slice(0, 100)}</td>;
};

export default CodeFormatter;
