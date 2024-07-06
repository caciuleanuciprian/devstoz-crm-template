import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import Page from "@/components/common/page";
import Documents from "@/components/documents/documents";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const DocumentsPage = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.DOCUMENTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <Documents />
    </Page>
  );
};

export default DocumentsPage;
