import { Design } from "@/types/common";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidString } from "@/utils/UtilityFunctions";
import { updateDesign } from "./action";

interface Props {
  isModalOpen: boolean,
  onOpenChange: (e:any) => void;
  selectedDesign?: Design;
  refreshFunction: () => void
}

export default function UpdateDesignModal(props:Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [newDesign, setNewDesign] = useState<Design>()

  const handleUpdateDesign = async () => {
    try {
      setIsLoading(true)
      const response = await updateDesign(newDesign!)

      if(response.success) {
        toast.success(response.success);
        setTimeout(() => {
          props.refreshFunction();
          props.onOpenChange(false);
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

  const handleReset = () => {
    setNewDesign(props.selectedDesign);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDesign((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDesign((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const hasInfoChanged = () => {
    if(
      props.selectedDesign?.name != newDesign?.name ||
      props.selectedDesign?.slug != newDesign?.slug ||
      props.selectedDesign?.description != newDesign?.description
    ) {
      return true;
    }
    return false;
  }

  const hasValidValues = () => {
    if(
      isValidString(newDesign?.name) &&
      isValidString(newDesign?.slug)    
    ) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if(props.selectedDesign) {
      setNewDesign(props.selectedDesign)
    }
  }, [props.selectedDesign])
  
  return (
    <Dialog modal open={props.isModalOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Design</DialogTitle>
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
                placeholder={props.selectedDesign?.name}
                value={newDesign?.name}
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
                placeholder={props.selectedDesign?.slug}
                value={newDesign?.slug}
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
              value={newDesign?.description}
              onChange={handleTextareaChange}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center justify-start"> 
          <div className="flex flex-row w-full gap-1">
            <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-neutral-400 hover:bg-neutral-500" onClick={props.onOpenChange}>
              Cancel
            </Button>
            <Button disabled={isLoading || !hasInfoChanged()} size={'sm'} type="button" variant="secondary" className="bg-blue-400 hover:bg-blue-500" onClick={handleReset}>
              Reset Info
            </Button>
          </div>
          <Button disabled={isLoading || !hasInfoChanged() || !hasValidValues()} size={'sm'} type="button" variant="secondary" className="bg-red-400 hover:bg-red-500" onClick={handleUpdateDesign}>
            {isLoading ? <><Loader2Icon className="animate-spin" />Please wait</> : "Update Design"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}