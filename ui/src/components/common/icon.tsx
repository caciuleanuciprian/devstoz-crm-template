const Icon = ({ icon, className }: any) => {
  return (
    <div
      className={`${
        className ? className : ""
      } h-[1.2rem] w-[1.2rem] cursor-pointer`}
    >
      {icon}
    </div>
  );
};

export default Icon;
