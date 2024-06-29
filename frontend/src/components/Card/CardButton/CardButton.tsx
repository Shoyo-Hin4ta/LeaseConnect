import { Button } from '@/components/ui/button'
import React from 'react'

const CardButton = ({ButtonText, onClick} : {
    ButtonText: string;
    onClick?: () => void;
}) => {
  return (
    <Button onClick={onClick}>{ButtonText}</Button>
  )
}

export default CardButton