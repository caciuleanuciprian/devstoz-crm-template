export const Slot = ({ children, className }: any) => {
  return (
    <div
      className={`${className} flex flex-col items-between w-1/2 min-h-[350px] bg-secondary p-4 rounded-md`}
    >
      {children}
    </div>
  );
};
