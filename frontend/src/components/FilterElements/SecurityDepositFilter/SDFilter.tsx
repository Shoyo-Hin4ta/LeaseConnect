import React from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SDFilter = ({ onSecurityDepositChange, onUtilitiesChange } : {
  onSecurityDepositChange : (securityDepositIncluded: boolean) => void,
  onUtilitiesChange : (utilitiesIncluded: boolean) => void
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2 text-base">
      <div className="flex gap-4 items-center">
        <Label htmlFor="security-deposit-included">No Security Deposit</Label>
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