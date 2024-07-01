import React from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SDFilter = ({ onSecurityDepositChange, onUtilitiesChange, securityDepositValue, utilitiesValue } : {
  onSecurityDepositChange : (securityDepositIncluded: boolean) => void,
  onUtilitiesChange : (utilitiesIncluded: boolean) => void,
  securityDepositValue: boolean,
  utilitiesValue: boolean
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Additional Options</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="security-deposit-included" className="text-sm">No Security Deposit</Label>
          <Switch 
            id="security-deposit-included" 
            checked={securityDepositValue}
            onCheckedChange={onSecurityDepositChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="utilities-included" className="text-sm">Utilities Included</Label>
          <Switch 
            id="utilities-included" 
            checked={utilitiesValue}
            onCheckedChange={onUtilitiesChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SDFilter