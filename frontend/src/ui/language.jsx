import { SubHeading } from "../components/subheading";

export default function LanguageSelect({ label, value, onChange }) {
  return (
    <div>
      <SubHeading text={label} />
      <select
        value={value}
        onChange={onChange}
        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Language</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
      </select>
    </div>
  );
}
