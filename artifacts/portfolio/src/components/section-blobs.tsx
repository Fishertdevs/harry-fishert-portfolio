const SectionBlobs = ({ hideTop = false }: { hideTop?: boolean }) => (
  <>
    {!hideTop && (
      <div className="absolute -top-20 -right-20 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-primary/20 dark:bg-primary/40 rounded-full blur-[90px] dark:blur-[110px] pointer-events-none" />
    )}
    <div className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-purple-400/15 dark:bg-purple-500/35 rounded-full blur-[90px] dark:blur-[110px] pointer-events-none" />
  </>
)

export default SectionBlobs
