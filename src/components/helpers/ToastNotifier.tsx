import React, { useEffect } from "react";
import { useToastNotification } from "../hooks/use-toast-notification";
interface ToastNotifierProps {
  state: {
    message: string | null;
    errors: Record<string, string[]>;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      message: string | null;
      errors: Record<string, string[]>;
    }>
  >;
}

const ToastNotifier: React.FC<ToastNotifierProps> = ({ state, setState }) => {
  const { triggerToast } = useToastNotification();

  useEffect(() => {
    if (state.message || Object.keys(state.errors ?? {}).length > 0) {
      triggerToast({
        message: state.message,
        errors: state.errors,
      });

      setState({ message: null, errors: {} });
    }
  }, [state, triggerToast, setState]);

  return null;
};

export default ToastNotifier;
