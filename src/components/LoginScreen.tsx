import { SignIn } from '@clerk/clerk-react';

const LoginScreen = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              background: `hsl(${217 + Math.random() * 100}, ${60 + Math.random() * 30}%, ${60 + Math.random() * 20}%)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Centered header at the top */}
      <div className="w-full flex flex-col items-center pt-16 pb-8 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center text-purple-600 leading-tight drop-shadow-lg">
          MindSpace AI
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-center text-black font-light max-w-2xl">
          Your personal AI therapist companion. A safe space for growth and healing.
        </p>
      </div>

      {/* Centered SignIn modal/card below header */}
      <div className="flex flex-col items-center justify-center w-full z-10">
        <div className="px-6 pb-6">
          <SignIn
            appearance={{
              elements: {
                card: "bg-white rounded-2xl shadow-2xl border border-gray-200 p-8",
                header: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                footer: "hidden",
              },
              variables: {
                colorPrimary: "#a259ff",
                colorText: "#18122B",
                colorInputBackground: "#f7f7fa",
                colorInputText: "#18122B",
              },
            }}
            oauthFlow="popup"
            withSignUp={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
