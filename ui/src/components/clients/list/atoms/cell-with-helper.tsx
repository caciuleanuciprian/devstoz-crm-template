interface CellWithHelperProps {
  label: any;
  helper: any;
}

export const CellWithHelper = ({ label, helper }: CellWithHelperProps) => {
  return (
    <div>
      <p>{label}</p>
      <p className="text-xs text-muted-foreground opacity-50">{helper}</p>
    </div>
  );
};
