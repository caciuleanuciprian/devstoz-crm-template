import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type DocumentCardProps = {
  title: string;
  description?: string;
  file_type: string;
  onClick: () => void;
};

export const DocumentCard = ({
  title,
  description,
  file_type,
  onClick,
}: DocumentCardProps) => {
  return (
    <Card
      className="w-[200px] h-[275px] !rounded-lg flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-4 h-2/8 flex justify-center items-center text-center font-bold">
        {title}
      </CardHeader>
      <CardContent className="p-4 w-full h-5/8 justify-center items-center text-sm text-foreground">
        {description}
      </CardContent>
      <CardFooter className="p-2 h-1/8 flex justify-end items-end text-muted-foreground font-semibold text-xs">
        {file_type}
      </CardFooter>
    </Card>
  );
};
