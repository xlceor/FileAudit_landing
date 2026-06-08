export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to FileMaster</h1>
      <p className="mt-3 text-xl">The enterprise-grade file auditing utility.</p>
      <div className="mt-6">
        <a href="#features" className="bg-blue-500 text-white px-4 py-2 rounded">Learn More</a>
      </div>
    </div>
  );
}
