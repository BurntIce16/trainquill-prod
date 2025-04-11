"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function DeviceAlert() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isTablet = /Tablet|iPad/i.test(navigator.userAgent)
      return isMobile || isTablet
    }

    setIsOpen(checkDevice())
  }, [])

  const handleUnderstand = () => {
    setIsOpen(false)
    router.back()
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Device Not Supported</AlertDialogTitle>
          <AlertDialogDescription>
            This study can only be taken on a laptop or desktop computer. Please switch to an appropriate device to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleUnderstand}>
            Understood
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}