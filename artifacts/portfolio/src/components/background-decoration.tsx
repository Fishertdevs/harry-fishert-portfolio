const BackgroundDecoration = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute -top-16 -right-16 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-primary/25 dark:bg-primary/20 rounded-full blur-3xl" />
    <div className="absolute top-1/3 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/25 dark:bg-blue-400/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-20 -right-10 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-primary/25 dark:bg-primary/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-52 h-52 sm:w-80 sm:h-80 bg-blue-400/25 dark:bg-blue-400/20 rounded-full blur-3xl" />
  </div>
)

export default BackgroundDecoration
