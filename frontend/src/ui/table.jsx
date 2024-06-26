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
    // getting the output of the users submission
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
      <td className="px-6 py-4">
        {item.stdin && atob(item.stdin) && (
          <div>
            <strong>Stdin:</strong> <pre>{atob(item.stdin)}</pre>
          </div>
        )}
        <div>
          <strong>Status</strong>
          <h1>{output.status && output.status.description}</h1>{" "}
          {output.stdout && atob(output.stdout) && (
            <div>
              <strong>Output:</strong>
              <h1>{atob(output.stdout)}</h1>
            </div>
          )}
          {output.compile_output && atob(output.compile_output) && (
            <div>
              <strong>compiler_Output:</strong>
              <pre>{atob(output.compile_output).slice(0, 120)}</pre>
            </div>
          )}
          {output.stderr && atob(output.stderr) && (
            <div>
              <strong>Error Output:</strong>
              <pre>{atob(output.stderr).slice(0, 120)}</pre>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
