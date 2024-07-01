import { ReactNode } from "react"

type PropsType = {
  children: ReactNode;
}

const Container = ({ children }: PropsType) => {
  return (
  <div className="w-[95%] border border-indigo-200  dark:border-gray-700 flex flex-col items-center p-2 font-roboto rounded-lg shadow-lg bg-white dark:bg-gray-800">
      {children}
    </div>
  )
}

export default Container