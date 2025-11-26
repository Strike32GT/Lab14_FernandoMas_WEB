import Nav from "./Nav";

export default function Layout( {children}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">
                {children}
            </main>
        </div>
    );
}