const BackgroundDecoration = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] sm:w-[36rem] sm:h-[36rem] bg-primary/30 dark:bg-primary/25 rounded-full blur-[100px]" />
    <div className="absolute top-1/3 -left-28 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-purple-400/25 dark:bg-purple-500/20 rounded-full blur-[100px]" />
    <div className="absolute -bottom-28 -right-10 w-[26rem] h-[26rem] sm:w-[36rem] sm:h-[36rem] bg-cyan-400/25 dark:bg-cyan-500/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/25 dark:bg-blue-400/20 rounded-full blur-[100px]" />
  </div>
)

export default BackgroundDecoration
