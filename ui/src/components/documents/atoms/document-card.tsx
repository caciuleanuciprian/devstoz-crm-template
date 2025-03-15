import { Loader } from "@/components/common/loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type DocumentCardProps = {
  title: string;
  file_type: string;
  onClick: () => void;
};

export const DocumentCard = ({
  title,
  file_type,
  onClick,
}: DocumentCardProps) => {
  return (
    <Card
      className="w-[200px] h-[275px] min-w-[200px] min-h-[275px] !rounded-lg flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex p-4 w-full h-full justify-center items-center text-sm text-foreground break-all">
        <p>{title}</p>
      </CardContent>
      <CardFooter className="p-2 h-1/8 flex justify-end items-end text-muted-foreground font-semibold text-xs">
        {file_type}
      </CardFooter>
    </Card>
  );
};

export const LoadingDocumentCard = () => {
  return (
    <Card className="w-[200px] h-[275px] min-w-[200px] min-h-[275px] !rounded-lg flex flex-col">
      <CardContent className="p-4 w-full h-full justify-center items-center text-sm text-foreground flex">
        <Loader center className="h-full" />
      </CardContent>
    </Card>
  );
};
