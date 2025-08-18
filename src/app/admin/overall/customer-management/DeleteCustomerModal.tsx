import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteCustomerById } from "./action";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2Icon } from 'lucide-react';
import { UserBasicInfo } from "@/types/common";

interface Props {
  isModalOpen: boolean,
  onOpenChange: (e:any) => void;
  selectedCustomer?: UserBasicInfo;
  refreshFunction: () => void
}

export default function DeleteCustomerModal(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteCustomer = async () => {
    try{
      setIsLoading(true)
      const response = await deleteCustomerById(props.selectedCustomer!.id);
      
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
    } catch(error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog modal open={props.isModalOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Customer</DialogTitle>
        </DialogHeader>
        <div className="text-neutral-800 text-sm font-medium pl-2">
          <p>Name: {props.selectedCustomer?.firstName + " " + props.selectedCustomer?.lastName}</p>
          <p>Email: {props.selectedCustomer?.email}</p>
        </div>
        <DialogDescription className="text-sm">
          Deleting this customer will remove all the associated data as well. 
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-end">
          <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-neutral-400 hover:bg-neutral-500" onClick={props.onOpenChange}>
            Cancel
          </Button>
          <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-red-400 hover:bg-red-500" onClick={handleDeleteCustomer}>
            {isLoading ? <><Loader2Icon className="animate-spin" />Please wait</> : "Delete Customer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}