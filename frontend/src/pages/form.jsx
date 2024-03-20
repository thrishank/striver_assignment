import { useState } from "react";
import TextInput from "../components/textinput";
import LanguageSelect from "../ui/language";
import Button from "../components/button";
import axios from "axios";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { useNavigate } from "react-router-dom";

export default function CodeForm({ axiosInstance }) {
  /* Can use a object here to store all the sate variables 
  in one single object but intially went with this approach.*/
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [stdin, setStdin] = useState("");
  const [sourcecode, setSourceCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function code_submission(id) {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "941c177e39msh9ec7bd994dd0784p1521f2jsn1a605540f3e9",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: id,
        stdin: btoa(stdin), // sending the base64 data
        source_code: btoa(sourcecode),
      },
    };

    try {
      const response = await axiosInstance.request(options);
      return response.data.token;
    } catch (error) {
      setErrorMessage("Error submitting code. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!language) {
      setErrorMessage("Please select a language.");
      return;
    }

    let id;

    switch (language) {
      // hard coded the languages id since we are dealing with only four
      case "JavaScript":
        id = 93;
        break;
      case "Java":
        id = 91;
        break;
      case "Python":
        id = 92;
        break;
      case "C++":
        id = 52;
        break;
      default:
        setErrorMessage("Invalid language selected.");
        return;
    }

    const token = await code_submission(id); // gets the output token submitted to the judge0 API

    const requestbody = {
      username,
      language,
      /* again sending the data in encoded base64 to store in database
      since the code can contain combination of numbers and differnet types of charcters */
      stdin: btoa(stdin),
      sourcecode: btoa(sourcecode),
      output: token,
    };

    // sending the data to our express backend
    try {
      await axiosInstance
        .post(
          "https://striver-assignment-xnzp.onrender.com/api/v1/submit-form",
          JSON.stringify(requestbody),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setErrorMessage(res.data);
          navigate("/entries");
        });
    } catch (error) {
      setErrorMessage("Error submitting form data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-300 flex h-screen justify-center"
    >
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-md text-center h-max w-100 px-8">
          <Heading text={"Submit Your code"} />
          <SubHeading text={"Username"} />
          <input
            className="appearance-none block w-full bg-gray-700 text-white text-lg border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-green-500"
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <LanguageSelect
            label="Preferred Code Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <TextInput
            label="Source Code"
            value={sourcecode}
            onChange={(e) => setSourceCode(e.target.value)}
            rows={10}
            textarea
          />
          <TextInput
            label="Input"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            textarea
          />
          <div className="pt-4">
            <Button text={"Submit"} />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
}

CodeForm.defaultProps = {
  axiosInstance: axios,
};
