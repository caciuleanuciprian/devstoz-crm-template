export const Slot = ({ children, className }: any) => {
  return (
    <div
      className={`${className} flex flex-col items-between w-1/2 bg-secondary p-4 rounded-md`}
    >
      {children}
    </div>
  );
};
