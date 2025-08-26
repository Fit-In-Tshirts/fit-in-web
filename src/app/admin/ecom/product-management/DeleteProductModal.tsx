import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/common";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProduct } from "./action";

interface Props {
  isModalOpen: boolean,
  onOpenChange: (e:any) => void;
  selectedProduct?: Product;
  refreshFunction: () => void
}

export default function DeleteProductModal(props:Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true)
      const response = await deleteProduct(props.selectedProduct!.id)

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
  
  return (
    <Dialog modal open={props.isModalOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <div>
          Are you sure you want to permanently
          delete <span className="font-bold">{props.selectedProduct?.name}</span> ? <br/>
        </div>
        <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        <DialogFooter> 
          <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-neutral-400 hover:bg-neutral-500" onClick={props.onOpenChange}>
            Cancel
          </Button>
          <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-red-400 hover:bg-red-500" onClick={handleDeleteProduct}>
            {isLoading ? <><Loader2Icon className="animate-spin" />Please wait</> : "Delete Design"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}