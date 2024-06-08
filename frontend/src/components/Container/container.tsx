import { ReactNode } from "react"

type PropsType = {
    children : ReactNode;
}

const container = ({children} : PropsType) => {
  return <div className="w-full max-w-7xl mx-auto px-4 ">{children}</div>
}

export default container