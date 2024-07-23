
const ChatPageLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <main className=" w-11/12 md:w-4/5 h-[95vh] md:h-[95vh]  mx-auto  rounded-xl  flex flex-col gap-8 justify-center overflow-y-auto no-scrollbar">
        {children}
    </main>
  )
}

export default ChatPageLayout

