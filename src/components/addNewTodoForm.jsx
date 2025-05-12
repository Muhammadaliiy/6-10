import { input } from "./ui/input";
import { label } from "./ui/label";

export default function addNewTodoForm() {
  return (
    <form>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="title">Sarlavha*</label>
        <input type="text" id="title" placeholder="Sarlavhani kiriting" />
      </div>
    </form>
  );
}
