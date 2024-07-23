
const ChatPageLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <main className="w-4/5 md:w-4/5 h-[70vh] md:h-[90vh]  mx-auto  rounded-xl  flex flex-col gap-8 justify-center">
        {children}
    </main>
  )
}

export default ChatPageLayout

