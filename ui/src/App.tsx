import { useRecoilState } from "recoil";
import { atomExample } from "./lib/recoil/example.recoil";
import { useEffect } from "react";

function App() {
  const [atomEx, setAtomEx] = useRecoilState(atomExample);
  useEffect(() => {
    setAtomEx("test");
  });

  return "Should be removed.";
}

export default App;
