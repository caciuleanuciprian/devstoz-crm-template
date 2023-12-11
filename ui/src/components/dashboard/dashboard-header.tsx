import SearchBar from "../search-bar";

const DashboardHeader = () => {
  return (
    <div className="flex h-[5vh] gap-3 items-center py-4 pl-8 pr-4 bg-[#F4F4F5]">
      <p>Dashboard</p>
      <SearchBar />
    </div>
  );
};

export default DashboardHeader;
