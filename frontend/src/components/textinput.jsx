import { SubHeading } from "./subheading";

export default function TextInput({ label, value, onChange, textarea, rows }) {
  const InputComponent = textarea ? "textarea" : "input";

  return (
    <div className="">
      <SubHeading text={"Enter Your Source Code"} />
      <InputComponent
        value={value}
        onChange={onChange}
        rows={rows}
        className="block p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={label}
      />
    </div>
  );
}
