import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { addTodo, validation } from "../request";
import { toast } from "sonner";

export default function AddNewTodoForm({ dispatch }) {
  const [addLoading, setAddLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendData = {};
    formData.forEach((value, key) => {
      if (key === "completed") {
        sendData[key] = value === "completed";
      } else {
        sendData[key] = value;
      }
    });
    const result = validation(sendData);
    if (result) {
      const { target, message } = result;
      e.target[target]?.focus();
      toast.info(message);
    } else {
      setAddLoading(true);
      addTodo(sendData)
        .then((res) => {
          toast.success("Malumot muvafaqqiyatli qo'shildi");
          dispatch({ type: "add", payload: res });
        })
        .catch(({message}) => {
            console.log(message);
            
        })
        .finally(() => {
          setAddLoading(false);
        });
    }
  }
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="title">Sarlavha*</Label>
        <Input name="title" type="text" id="title" placeholder="Sarlavha" />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label>Holati*</Label>

        <RadioGroup name="completed" defaultValue="uncompleted">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="completed" />
            <Label htmlFor="completed">Bajarilgan✅</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="uncompleted" id="uncompleted" />
            <Label htmlFor="uncompleted">Bajarilmagan❌</Label>
          </div>
        </RadioGroup>
        <div className="mt-5">
          <Label className="mb-2">Muximliylik darajasi*</Label>
          <Select defaultValue="low" name="priority">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Daraja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Yuqori</SelectItem>
              <SelectItem value="medium">O'rta</SelectItem>
              <SelectItem value="low">Past</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button disabled={addLoading}>
        {addLoading ? <RefreshCcw className="animate-spin" /> : "Tasdiqlash"}
      </Button>
    </form>
  );
}
