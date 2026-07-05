const BackgroundDecoration = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 dark:bg-primary/10 rounded-full blur-2xl" />
    <div className="absolute top-1/3 -left-24 w-56 h-56 sm:w-80 sm:h-80 bg-blue-400/10 dark:bg-blue-400/10 rounded-full blur-2xl" />
    <div className="absolute -bottom-24 -right-16 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 dark:bg-primary/10 rounded-full blur-2xl" />
    <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-blue-400/10 dark:bg-blue-400/10 rounded-full blur-2xl" />
  </div>
)

export default BackgroundDecoration
