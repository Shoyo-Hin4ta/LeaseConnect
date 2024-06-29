import { ReactNode } from "react"

type PropsType = {
    children : ReactNode;
}

const container = ({children} : PropsType) => {
  return (
  <div className="border border-red-500 flex flex-col items-center w-4/5 p-2 font-roboto">
    {children}
  </div>
  )}

export default container