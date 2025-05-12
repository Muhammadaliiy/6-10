import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Button, buttonVariants } from "./ui/button";
import { CheckCircle, RefreshCcw, Trash, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteTodo } from "../request";
import { useState } from "react";
import { toast } from "sonner";

export default function Todo({
  priority = "outline",
  title = "nmaa gap",
  completed = false,
  id = 1,
  dispatch,
}) {
  const styles = {
    hight: "outline",
    medium: "destructive",
    low: "secondary",
  };

  const [delLoading, setDelLoading] = useState(false);

  function handleDelete(id) {
    setDelLoading(true);
    deleteTodo(id)
      .then((id) => {
        dispatch({ type: "delete", payload: id });
        toast.success("Todo muvofaqqiyatli o'chirildi");
      })
      .catch(({message}) => {
        toast.error(message)
      })
      .finally(() => {
        setDelLoading(false);
      });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            Muximliylik darajasi
            <Badge className="uppercase" variant={styles[priority]}>
              {priority}
            </Badge>
          </span>
          <span className="flex items-center gap-2">
            Holati
            <Button size={"icon"} variant={completed ? "outline" : "secondary"}>
              {" "}
              {completed ? <CheckCircle /> : <X />}
            </Button>
          </span>
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                disabled={delLoading}
                onClick={() => handleDelete(id)}
                className={buttonVariants({ variant: "destructive" })}
              >
                {delLoading ? (
                  <RefreshCcw className="animate-spin" />
                ) : (
                  <Trash />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>O'chirish</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  );
}
