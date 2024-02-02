import { Loader } from "@/components/common/loader";
import { ClientTransaction } from "../atoms/client-transaction";
import { Button } from "@/components/ui/button";
import { GetTransactions } from "@/components/clients/core/clients.service";
import useAxios from "@/lib/axios/useAxios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";
import { useRecoilState } from "recoil";

export const ClientTransactions = () => {
  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { clientId } = useParams();

  const { data, error, isLoading, dataCode, loadData } = useAxios({
    fetchFn: GetTransactions,
    paramsOfFetch: {
      clientId: clientId,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  console.log("transactions", data);

  return (
    <>
      <div className="bg-background h-[85vh] flex flex-col justify-between p-4">
        <div>
          {data &&
            data.map((transaction: any, index: number) => (
              <ClientTransaction key={index} {...transaction} />
            ))}
          {isLoading && <Loader />}
        </div>
        <div className="p-4 pb-0 border-t-2">
          <Button variant={"default"} onClick={() => {}}>
            {"edit"}
          </Button>
        </div>
      </div>
    </>
  );
};
