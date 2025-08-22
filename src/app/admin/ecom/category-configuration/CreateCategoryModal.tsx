import { Category } from "@/types/common";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCategory, updateCategory } from "./action";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidString } from "@/utils/UtilityFunctions";
import { supabaseStroage } from "@/lib/supabaseStorage";
import { Buckets } from "@/constants/Buckets";

interface Props {
  isModalOpen: boolean,
  onOpenChange: (e:any) => void;
  refreshFunction: () => void
}

const initialInfo: Category = {
    id: '',
    name: '',
    slug: '',
    sortOrder: 0,
  }

export default function CreateCategoryModal(props:Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [newCategory, setNewCategory] = useState<Category>(initialInfo)
  const [file, setFile] = useState<File|null>(null);

  const handleCreateCategory = async () => {
    try {
      setIsLoading(true)
      const uploadedUrl = await handleUploadImage();

      const response = await createCategory({...newCategory!, sizeGuide: uploadedUrl});

      if(response.success) {
        toast.success(response.success);
        setTimeout(() => {
          props.refreshFunction();
          handleClose()
        }, 1500);
      }

      if(response.error) {
        toast.error(response.error);
      }
    } catch(error:any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadImage = async () => {
    if(!file) {
      return;
    }

    const filePath = `${newCategory.name}-${Date.now()}`;
    const {data, error} = await supabaseStroage.storage
      .from(Buckets.SIZE_GUIDES)
      .upload(filePath, file);

    if(error) {
      toast.error("Size guide upload failed");
      return;
    }

    const { data:publicUrlData } = supabaseStroage.storage
      .from(Buckets.SIZE_GUIDES)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };


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

  const hasValidValues = () => {
    if(
      isValidString(newCategory?.name) &&
      isValidString(newCategory?.slug) &&
      (newCategory!.sortOrder == 0 || newCategory!.sortOrder > 0)
    ) {
      return true;
    }
    return false;
  }

  const handleClose = () => {
    setNewCategory(initialInfo)
    props.onOpenChange(false)
  }
  
  return (
    <Dialog modal open={props.isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new category</DialogTitle>
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
            <div className='flex flex-col gap-2 items-start justify-center'>
              <Label htmlFor="sizeGuide" className="w-18">Size Guide</Label>
              <Input 
                type="file" 
                id="sizeGuide" 
                name='sizeGuide' 
                onChange={handleFileChange} 
              />
            </div>
            <div className='flex flex-col gap-2 items-start justify-center'>
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
          </div>
        </div>
        <DialogDescription />
        <DialogFooter className="flex flex-row items-center justify-start"> 
          <div className="flex flex-row w-full gap-1">
            <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-neutral-400 hover:bg-neutral-500" onClick={handleClose}>
              Cancel
            </Button>
          </div>
          <Button disabled={isLoading || !hasValidValues()} size={'sm'} type="button" variant="secondary" className="bg-red-400 hover:bg-red-500" onClick={handleCreateCategory}>
            {isLoading ? <><Loader2Icon className="animate-spin" />Please wait</> : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}