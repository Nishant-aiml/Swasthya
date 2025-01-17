import { toast } from "@/components/ui/use-toast"

export function useToast() {
  return {
    toast: (props: { title: string; description?: string; variant?: "default" | "destructive" }) => {
      toast({
        ...props,
        duration: 3000,
      })
    },
  }
}
