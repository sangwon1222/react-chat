import * as RadixDialog from "@radix-ui/react-dialog"
import { forwardRef } from "react"
import { X } from "lucide-react"

export const Dialog = RadixDialog.Root

export const DialogTrigger = RadixDialog.Trigger

export const DialogPortal = RadixDialog.Portal

export const DialogOverlay = RadixDialog.Overlay

export const DialogDescription = RadixDialog.Description

const overlayStyle =
  "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
const contentStyle =
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
const closeStyle =
  "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"

export const DialogContent = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children: React.ReactNode
  }
>(({ className = "", children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={overlayStyle} />
    <RadixDialog.Content
      ref={ref}
      className={`${contentStyle} ${className}`}
      {...props}
    >
      {children}
      <RadixDialog.Close className={closeStyle}>
        <X className="h-4 w-4" />
        <span className="sr-only">닫기</span>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </DialogPortal>
))

export const DialogNotAllowOverlayContent = forwardRef<
  HTMLDivElement,
  { className?: string; hasCloseBtn?: boolean; children?: React.ReactNode }
>(({ className, hasCloseBtn = true, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={overlayStyle} />
    <RadixDialog.Content
      ref={ref}
      className={`${contentStyle} ${className}`}
      onPointerDownOutside={(event: any) => event.preventDefault()}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  </DialogPortal>
))

export const DialogHeader: React.FC<
  React.HTMLAttributes<HTMLElement> & { className?: string }
> = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
)

export const DialogTitle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className = "", children, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </RadixDialog.Title>
))
