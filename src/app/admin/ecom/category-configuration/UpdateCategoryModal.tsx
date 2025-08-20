import { Category, SelectedCategoryInfo } from "@/types/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateCategory } from "./action";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Props {
  isModalOpen: boolean,
  onOpenChange: (e:any) => void;
  selectedCategory?: Category;
  refreshFunction: () => void
}

export default function UpdateCategoryModal(props:Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [newCategory, setNewCategory] = useState<Category>()

  const handleUpdateCategory = async () => {
    try {
      console.log(newCategory)
      // setIsLoading(true)
      // const response = await updateCategory(props.selectedCategory!.id)

      // if(response.success) {
      //   toast.success(response.success);
      //   setTimeout(() => {
      //     props.refreshFunction();
      //     props.onOpenChange(false);
      //   }, 1500);
      // }

      // if(response.error) {
      //   toast.error(response.error);
      // }
    } catch(error:any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setNewCategory(props.selectedCategory);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  useEffect(() => {
    if(props.selectedCategory) {
      setNewCategory(props.selectedCategory)
    }
  }, [props.selectedCategory])
  
  return (
    <Dialog modal open={props.isModalOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex flex-row gap-3 mb-2">
            <div className='flex flex-col gap-2 items-start justify-center w-auto grow-1'>
              <Label htmlFor="firstName" className="w-10">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name='name' 
                required
                placeholder={props.selectedCategory?.name}
                value={newCategory?.name}
                onChange={handleChange} 
              />
            </div>
            <div className='flex flex-col gap-2 items-start justify-center w-auto grow-1'>
              <Label htmlFor="firstName" className="w-10">Slug</Label>
              <Input 
                type="text" 
                id="slug" 
                name='slug' 
                required
                placeholder={props.selectedCategory?.slug}
                value={newCategory?.slug}
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start justify-center mb-2 w-auto grow-1'>
            <Label htmlFor="firstName" className="w-30">Descrption</Label>
            <Textarea 
              id="description" 
              name='description' 
              required
              value={newCategory?.description}
              onChange={handleTextareaChange}
            />
          </div>
          <div className="flex flex-row gap-3 items-center justify-start">
            <div className='flex flex-row gap-2 items-center justify-center'>
              <Label htmlFor="sortOrder" className="w-18">Sort Order</Label>
              <Input 
                type="number" 
                id="sortOrder" 
                name='sortOrder' 
                min={0}
                max={100}
                required
                className="w-20"
                value={newCategory?.sortOrder}
                onChange={handleChange} 
              />
            </div>
            <div className='flex w-35 flex-row items-center justify-center gap-2 rounded-lg border p-1 shadow-sm'>
              <div className="space-y-0.5">
                <Label>Is Active ?</Label>
              </div>
              <div>
                <Switch
                  checked={newCategory?.isActive ?? false}
                  onCheckedChange={(checked) => {
                    setNewCategory((prev) => {
                      if (!prev) return undefined;
                      return { ...prev, isActive: checked };
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center justify-start"> 
          <div className="flex flex-row w-full gap-1">
            <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-neutral-400 hover:bg-neutral-500" onClick={props.onOpenChange}>
              Cancel
            </Button>
            <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-blue-400 hover:bg-blue-500" onClick={handleReset}>
              Reset Info
            </Button>
          </div>
          <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-red-400 hover:bg-red-500" onClick={handleUpdateCategory}>
            {isLoading ? <><Loader2Icon className="animate-spin" />Please wait</> : "Update Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}