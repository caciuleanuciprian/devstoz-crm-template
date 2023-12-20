import bg from "@/assets/auth-left-photo.jpg";

const AuthBackground = () => {
  return (
    <div className="relative hidden h-full flex-col bg-muted text-white lg:flex">
      <div className="absolute inset-0 bg-black opacity-90" />
      <img
        className="w-full h-full object-cover max-h-[100vh]"
        src={bg}
        alt="background"
      />
    </div>
  );
};

export default AuthBackground;
