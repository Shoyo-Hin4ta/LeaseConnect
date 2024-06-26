import React from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SDFilter = ({ onSecurityDepositChange, onUtilitiesChange } : {
  onSecurityDepositChange : (securityDepositIncluded: boolean) => void,
  onUtilitiesChange : (utilitiesIncluded: boolean) => void
}) => {
  return (
    <div className="my-2 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Label htmlFor="security-deposit-included">Security Deposit Included</Label>
        <Switch 
          id="security-deposit-included" 
          onCheckedChange={onSecurityDepositChange}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Label htmlFor="utilities-included"> Utilities Included</Label>
        <Switch 
          id="utilities-included" 
          onCheckedChange={onUtilitiesChange}
        />
      </div>
    </div>
  )
}

export default SDFilter