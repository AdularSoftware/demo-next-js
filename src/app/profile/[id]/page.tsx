export default async function ProfilePage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <h1 className="text-2xl font-bold">Profile Page</h1>
                <hr />
                <p>Welcome to your profile!</p>
                <span className="p-2 rounded text-black bg-orange-500">{resolvedParams.id}</span>
            </div>
        </div>
    );
}