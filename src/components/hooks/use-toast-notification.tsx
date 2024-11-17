import { useToast } from "./use-toast";

type ToastOptions = {
  message?: string | null;
  errors?: Record<string, string[]>;
};

export const useToastNotification = () => {
  const { toast } = useToast();

  const triggerToast = ({ message, errors }: ToastOptions) => {
    // Trigger a success toast if there's a message
    if (message) {
      toast({
        title: "Notification",
        description: message, // Plain text description
        variant: "default",
        key: `toast-${Date.now()}`,
      });
    }

    // Trigger an error toast for each error
    if (errors) {
      Object.entries(errors).forEach(([errorName, errorMessages], index) => {
        const combinedErrors = errorMessages
          .map((error, errorIndex) => `- ${error}`)
          .join("\n");

        toast({
          title: `Error: in ${errorName}`, // Display the error name
          description: combinedErrors, // Plain text error description
          variant: "destructive",
          key: `error-toast-${index}-${Date.now()}`,
        });
      });
    }
  };

  return { triggerToast };
};
