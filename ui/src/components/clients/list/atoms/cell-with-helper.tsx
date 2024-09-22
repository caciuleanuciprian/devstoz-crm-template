import { formatDate } from "date-fns";

interface CellWithHelperProps {
  label: any;
  helper?: any;
  value?: any;
}

export const CellWithHelper = ({
  label,
  helper,
  value,
}: CellWithHelperProps) => {
  return (
    <div className="pointer-events-none">
      <p>{label}</p>
      {helper && (
        <p className="text-xs text-muted-foreground opacity-50 font-semibold">
          {helper}
        </p>
      )}
      {value && (
        <p className="text-xs text-muted-foreground opacity-50 font-semibold">
          {formatDate(new Date(value), "P")}
        </p>
      )}
    </div>
  );
};
