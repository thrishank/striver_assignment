import axios from "axios";
import { useEffect, useState } from "react";
import { Heading } from "../components/heading";
import TableComponent from "../ui/table";

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://striver-assignment-xnzp.onrender.com/api/v1/entries";
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((Err) => {
        console.log("Error in the useEffect" + Err);
      });
  }, []);

  return (
    <div>
      <div className="text-center py-6">
        <Heading text={"All Code Submissions"} />
      </div>
      <div className="relative overflow-x-auto flex justify-center">
        <table className="w-70 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Source Code (First 100 charcters)
              </th>
              <th scope="col" className="px-6 py-3">
                Input & Output (First 100 charcters)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((object, key) => (
              <TableComponent item={object} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
