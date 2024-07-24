
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-[100vh] justify-center items-center">
      {/* Left Section */}
      <div className="hidden md:block"></div>

      {/* Right Section - Auth form Login or register */}
      <div className="">{children}</div>
    </section>
  );
}
