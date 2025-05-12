import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Moon, PlusCircle, SunIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNewTodoForm from "./AddNewTodoForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header({ dispatch }) {
  function handleFilter(value) {
    dispatch({ type: "filter", payload: value });
  }
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <header className="py-5 shadow-md">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo App</h1>
        <div className=" flex flex-wrap justify-end items-center  sm:flex  gap-2">
          <strong className="hidden md:block">
            Daraja bo'yicha filterlash
          </strong>
          <Select onValueChange={handleFilter}>
            <SelectTrigger className="max-w-[180px]  sm:mb-0 ">
              <SelectValue placeholder="Daraja bo'yicha filterlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Yuqori</SelectItem>
              <SelectItem value="medium">O'rta</SelectItem>
              <SelectItem value="low">Quyi</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={toggleTheme}
            className="rounded-full p-2 bg-gray-200 dark:bg-gray-800 "
          >
            {theme === "dark" ? <SunIcon /> : <Moon />}
          </button>

          <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "default" })}>
              New <PlusCircle />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yangi Todo qo'shish</DialogTitle>
                <DialogDescription>
                  Siz bu yerda yangi todo qo'shishingiz mumkin
                </DialogDescription>
              </DialogHeader>
              <AddNewTodoForm dispatch={dispatch} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
