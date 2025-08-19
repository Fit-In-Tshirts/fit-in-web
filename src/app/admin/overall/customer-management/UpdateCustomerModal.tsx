import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loader2Icon } from 'lucide-react';
import { Customer, CustomerAddress, CustomerPersonalInfo, CustomerPhoneNumber, UserBasicInfo } from "@/types/common";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getCustomerById, updateCustomerInfo } from "./action";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isValidPhoneNumber } from "@/utils/validation";
import Image from 'next/image';
import tickIcon from '../../../../icons/correct.png'
import crossIcon from '../../../../icons/wrong.png'
import { capitalizeFirstLetter, isValidString } from "@/utils/UtilityFunctions";
import { error } from "console";


interface Props {
  isModalOpen: boolean,
  onOpenChange: (e:any) => void;
  selectedCustomer?: UserBasicInfo;
  refreshFunction: () => void
}

export default function UpdateCustomerModal(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [customer, setCustomer] = useState<Customer>()
  const [personalInfo, setPersonalInfo] = useState<CustomerPersonalInfo>({
    id: '',
    firstName: '',
    lastName: ''
  })
  const [addressInfo, setAddressInfo] = useState<CustomerAddress>({
    id: '',
    addressLine1: '',
    addressLine2: '',
    houseNumber: '',
    province: '',
    city: '',
    zipcode: ''
  })
  const [contactInfo, setContactInfo] = useState<CustomerPhoneNumber[]>([
    {
      id: "",
      phoneNumber: ""
    },
    {
      id: "",
      phoneNumber: ""
    }
  ])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<any>>
  ) => {
    const { name, value } = e.target;
    setter((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProvinceChange = (
    key: string,
    value: string
  ) => {
    setAddressInfo((prev:any) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleContactInfoChange = (
    index: number,
    field: keyof CustomerPhoneNumber,
    value: string
  ) => {
    setContactInfo(prev => {
      const updated = [...prev]; 
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const getCustomer = async () => {
    try {
      setIsLoading(true);
      const response = await getCustomerById(props.selectedCustomer!.id )

      if(response.error) {
        toast.error(response.error)
      }

      setCustomer(response.data);
      setPersonalInfo({
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      })
      setAddressInfo(response.data.addresses[0])
      setContactInfo(response.data.phoneNumbers)
    } catch(error: any) {
      toast.error(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(props.selectedCustomer) {
      getCustomer()
    }
  }, [props.selectedCustomer])

  useEffect(() => {
    console.log(addressInfo);
  }, [addressInfo])

  const handleReset = () => {
    if(customer) {
      setPersonalInfo({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
      })
      setAddressInfo(customer.addresses[0])
      setContactInfo(customer.phoneNumbers)
    }
  }

  const hasInfoChanged = () => {
    if(
      personalInfo.firstName !== customer?.firstName ||
      personalInfo.lastName !== customer.lastName ||
      addressInfo.houseNumber !== customer?.addresses[0].houseNumber || 
      addressInfo.addressLine1 !== customer?.addresses[0].addressLine1 ||
      addressInfo.addressLine1 !== customer?.addresses[0].addressLine1 ||
      addressInfo.addressLine2 !== customer?.addresses[0].addressLine2 ||
      addressInfo.city !== customer?.addresses[0].city ||
      addressInfo.province !== customer?.addresses[0].province ||
      addressInfo.zipcode !== customer?.addresses[0].zipcode ||
      contactInfo[0].phoneNumber !== customer?.phoneNumbers[0].phoneNumber || 
      contactInfo[1].phoneNumber !== customer?.phoneNumbers[1].phoneNumber
    ) {
      return true;
    }
    return false;
  }

  const isValidInfo = () => {
    if(
      isValidString(personalInfo.firstName) &&
      isValidString(personalInfo.lastName) &&
      isValidString(addressInfo.houseNumber) &&
      isValidString(addressInfo.addressLine1) &&
      isValidString(addressInfo.addressLine2) &&
      isValidString(addressInfo.city) &&
      isValidString(addressInfo.province) &&
      isValidString(addressInfo.zipcode) &&
      isValidString(contactInfo[0].phoneNumber)
    ) {
      return true;
    }

    return false;
  } 

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await updateCustomerInfo(personalInfo, addressInfo, contactInfo);

      if(response.error) {
        toast.error(response.error)
      }

      if(response.success) {
        toast.success(response.success);
        setTimeout(() => {
          props.refreshFunction();
          props.onOpenChange(false);
        }, 1500);
      }
    } catch(error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
    
  }

  function Accordian() {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        disabled={isLoading}
      >
      <AccordionItem value="personal">
        <AccordionTrigger>Personal Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className='flex flex-row w-full justify-between gap-1'>
            <div className='flex flex-col gap-2 items-start justify-center mb-5 w-auto grow-1'>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                type="text" 
                id="firstName" 
                name='firstName' 
                required
                placeholder={personalInfo.firstName}
                value={personalInfo.firstName}
                onChange={(e) => handleChange(e, setPersonalInfo)} 
              />
            </div>
            <div className='flex flex-col gap-2 items-start justify-center mb-5 w-auto grow-1'>
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                type="text" 
                id="lastName" 
                name='lastName'
                required 
                placeholder={personalInfo.lastName} 
                value={personalInfo.lastName}
                onChange={(e) => handleChange(e, setPersonalInfo)}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="address">
        <AccordionTrigger>Address Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div id='deliveryAddress' className='flex flex-col w-full gap-1'>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-17 bg-neutral-50'>No.</p>
              <Input 
                type="text" 
                id="houseNumber" 
                name='houseNumber'
                required
                placeholder={addressInfo.houseNumber} 
                value={addressInfo.houseNumber} 
                onChange={(e) => handleChange(e, setAddressInfo)}
              />
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full '>
              <p className='border rounded-md p-1 w-17 bg-neutral-50'>Line 1</p>
              <Input 
                type="text" 
                id="addressLine1" 
                name='addressLine1' 
                required
                placeholder={addressInfo.addressLine1} 
                value={addressInfo.addressLine1} 
                onChange={(e) => handleChange(e, setAddressInfo)}
              />
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-17 bg-neutral-50'>Line 2</p>
              <Input 
                type="text" 
                id="addressLine2" 
                name='addressLine2' 
                required
                placeholder={addressInfo.addressLine2} 
                value={addressInfo.addressLine2} 
                onChange={(e) => handleChange(e, setAddressInfo)}
              />
            </div>
            
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-35 bg-neutral-50'>Nearest City</p>
              <Input 
                type="text" 
                id="city" 
                name='city' 
                required
                placeholder={addressInfo.city} 
                value={addressInfo.city} 
                onChange={(e) => handleChange(e, setAddressInfo)}
              />
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-35 bg-neutral-50'>Province</p>
              <Select 
                onValueChange={(value:any) => handleProvinceChange('province', value)} 
                required value={addressInfo.province} name='province'>
                <SelectTrigger className='w-full'>
                  <SelectValue id='province' className="border border-red-500"> {isValidString(addressInfo.province) ? capitalizeFirstLetter(addressInfo.province) : capitalizeFirstLetter(customer?.addresses[0].province) }</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="north central">North Central</SelectItem>
                    <SelectItem value="north western">North Western</SelectItem>
                    <SelectItem value="northern">Northern</SelectItem>
                    <SelectItem value="sabaragamuwa">Sabaragamuwa</SelectItem>
                    <SelectItem value="southern">Southern</SelectItem>
                    <SelectItem value="uva">Uva</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-35 bg-neutral-50'>Zip Code</p>
              <Input 
                type="text" 
                id="zipcode" 
                name='zipcode'
                required 
                placeholder={addressInfo.zipcode} 
                value={addressInfo.zipcode} 
                onChange={(e) => handleChange(e, setAddressInfo)}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contact">
        <AccordionTrigger>Contact Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className='flex flex-row w-full mb-5 justify-between'>
            <div className='flex flex-col gap-2 items-start justify-center'>
              <Label htmlFor="phoneNumber_mobile">Phone Number(mobile) *</Label>
              <div className='flex flex-row justify-center items-center gap-1'>
                <p className='border rounded-md p-1 bg-neutral-50'>+94</p>
                <div className='relative w-full max-w-md'>
                  <Input 
                    type="tel" 
                    id="phoneNumber_mobile" 
                    name='phoneNumber_mobile' 
                    required
                    placeholder={contactInfo[0].phoneNumber} 
                    value={contactInfo[0].phoneNumber} 
                    onChange={(e) => handleContactInfoChange(0, "phoneNumber", e.target.value)}
                    className='w-42'
                    maxLength={9}
                  />
                  {(contactInfo[0].phoneNumber.trim() == '') ? null :
                    isValidPhoneNumber(contactInfo[0].phoneNumber) ? (
                      <Image
                        src={tickIcon}
                        alt="tick"
                        width={17}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      />
                    ) : (
                      <Image
                        src={crossIcon}
                        alt="cross"
                        width={17}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      />
                    )
                  }
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 items-start justify-center'>
              <Label htmlFor="phoneNumber_home">Phone Number(home)</Label>
              <div className='flex flex-row justify-center items-center gap-1'>
                <p className='border p-1 rounded-md bg-neutral-50'>+94</p>
                <div className='relative w-full max-w-md'>
                  <Input 
                    type="tel" 
                    id="phoneNumber_home" 
                    name='phoneNumber_home' 
                    placeholder={contactInfo[1].phoneNumber} 
                    value={contactInfo[1].phoneNumber} 
                    onChange={(e) => handleContactInfoChange(1, "phoneNumber", e.target.value)}
                    className='w-42'
                    maxLength={9}
                  />
                  {(contactInfo[1].phoneNumber.trim() == '') ? null :
                    isValidPhoneNumber(contactInfo[1].phoneNumber) ? (
                      <Image
                        src={tickIcon}
                        alt="tick"
                        width={17}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      />
                    ) : (
                      <Image
                        src={crossIcon}
                        alt="cross"
                        width={17}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    )
  }

  return (
    <Dialog modal open={props.isModalOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Customer</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-center">
          Update <span className="font-bold">{props.selectedCustomer?.email}</span> information
        </DialogDescription>

        {Accordian()}

        <DialogFooter className="flex flex-row items-center justify-start">
          <div className="flex flex-row w-full gap-1">
            <Button disabled={isLoading} size={'sm'} type="button" variant="secondary" className="bg-neutral-400 hover:bg-neutral-500" onClick={props.onOpenChange}>
              Cancel
            </Button>
            <Button disabled={isLoading || !hasInfoChanged()} size={'sm'} type="button" variant="default" onClick={handleReset}>
              Reset Customer Info
            </Button>
          </div>
          <Button disabled={isLoading || !isValidInfo() || !hasInfoChanged()} size={'sm'} type="button" variant="secondary" className="bg-blue-400 hover:bg-blue-500" onClick={handleUpdate}>
            {isLoading ? <><Loader2Icon className="animate-spin" />Please wait</> : "Update Customer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}