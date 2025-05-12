import { PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Header() {
  return (
    <header className="py-5 shadow-md">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo app</h1>

        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: "default" })}>
            <PlusCircle />
            New
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi todo qoshish</DialogTitle>
              <DialogDescription>
                Siz bu yerda yangi todo qoshishingiz mumkin
              </DialogDescription>
            </DialogHeader>
            <addNewTodoForm />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
