import * as React from "react"

interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const CollapsibleContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}>({
  open: false,
  setOpen: () => {},
})

function Collapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: CollapsibleProps) {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : openState

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const nextOpen = typeof value === "function" ? value(open) : value
      if (!isControlled) {
        setOpenState(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, open, onOpenChange]
  )

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={className} data-state={open ? "open" : "closed"}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

function CollapsibleTrigger({ children, className, onClick, ...props }: CollapsibleTriggerProps) {
  const { open, setOpen } = React.useContext(CollapsibleContext)

  return (
    <button
      type="button"
      className={className}
      data-state={open ? "open" : "closed"}
      onClick={(e) => {
        onClick?.(e)
        setOpen((prev) => !prev)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

function CollapsibleContent({ children, className, ...props }: CollapsibleContentProps) {
  const { open } = React.useContext(CollapsibleContext)

  if (!open) return null

  return (
    <div className={className} data-state={open ? "open" : "closed"} {...props}>
      {children}
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
