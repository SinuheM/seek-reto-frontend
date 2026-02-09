import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-gray-100">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16">
        <LoginForm />
      </main>
    </div>
  );
}
