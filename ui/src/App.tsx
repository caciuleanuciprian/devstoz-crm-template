import { ModeToggle } from "./components/mode-toggle";
import { useRecoilState } from "recoil";
import { atomExample } from "./lib/recoil/example.recoil";
import { useEffect } from "react";
import { useAxios } from "./lib/axios/useAxios";

function App() {
  const [atomEx, setAtomEx] = useRecoilState(atomExample);
  useEffect(() => {
    setAtomEx("penis");
  });
  const { response, loading, error, fetchData } = useAxios({
    method: "POST",
    url: "/posts",
    headers: { accept: "*/*" },
    data: {
      userId: 1,
      id: 19392,
      title: "title",
      body: "Sample text",
    },
  });

  return (
    <>
      {/* <AuthGuard> */}
      {/* <DisclaimerGuard> */}
      <ModeToggle />
      {"Something here..."}
      {response ? `response, ${response}` : "no response"}
      {atomEx}
      {/* </DisclaimerGuard> */}
      {/* </AuthGuard> */}
    </>
  );
}

export default App;
