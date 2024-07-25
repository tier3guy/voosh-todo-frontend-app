import AddTaskButton from "@/components/add-task-button";
import Logo from "@/components/logo";
import ProfileButton from "@/components/profile-button";
import Searchbar from "@/components/searchbar";
import TodoDND from "@/components/todo-dnd";

export default function Page() {
    return (
        <div className="h-screen w-screen overflow-hidden relative">
            <div className="h-1/2 bg-gradient-to-b from-blue-500 to-blue-700 w-full p-6">
                <div className="flex items-center justify-between">
                    <Logo logoFull color="white" />
                    <ProfileButton />
                </div>
            </div>
            <div className="absolute top-0 left-0 h-screen w-screen p-6">
                <div className="mt-16 rounded-md h-[83vh] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 border-2 shadow flex flex-col">
                    <div className="p-3 border-b-2 flex items-center">
                        <div className="w-1/3 mr-2">
                            <Searchbar />
                        </div>
                        <div className="flex items-center gap-3">
                            <AddTaskButton />
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden h-full">
                        <TodoDND />
                    </div>
                </div>
            </div>
        </div>
    );
}
