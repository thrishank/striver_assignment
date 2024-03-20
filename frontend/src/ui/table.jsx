import axios from "axios";
import { useEffect, useState } from "react";

export default function TableComponent({ item }) {
  const [output, setOutput] = useState({});

  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/" + item.output,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "941c177e39msh9ec7bd994dd0784p1521f2jsn1a605540f3e9",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };
  useEffect(() => {
    if (item.output) {
      axios
        .request(options)
        .then((res) => {
          setOutput(res.data);
        })
        .catch((Err) => {
          console.log("Error in getting submission: " + Err);
        });
    }
  }, []);

  console.log(output);

  const dateTime = new Date(item.date);

  const dateoptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", dateoptions).format(
    dateTime
  );

  return (
    <tr
      key={item.id}
      className={
        item.id % 2 === 0
          ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          : "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"
      }
    >
      <td className="px-6 py-4 whitespace-nowrap dark:text-white">
        {item.username}
      </td>
      <td className="px-6 py-4">{item.language}</td>
      <td className="px-6 py-4">{formattedDate}</td>
      <td className="px-6 py-4">
        <pre>{atob(item.sourcecode).slice(0, 100)}</pre>
      </td>
      {/* <CodeFormatter
        codeString={atob(item.sourcecode)}
        language={item.language}
      /> */}
      <td className="px-6 py-4">
        <div>
          <strong>Stdin:</strong> {atob(item.stdin)}
        </div>
        <div>
          <strong>Status</strong>
          <h1>{output.status && output.status.description}</h1>{" "}
          <strong>Output:</strong>
          <h1>{output.stdout && atob(output.stdout)}</h1>
          <strong>compiler_Output:</strong>
          <pre>
            {output.compile_output && atob(output.compile_output).slice(0, 120)}
          </pre>
          <pre>{output.stderr && atob(output.stderr).slice(0, 120)}</pre>
        </div>
      </td>
    </tr>
  );
}
