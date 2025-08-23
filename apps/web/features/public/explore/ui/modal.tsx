import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@workspace/design-system/components/ui/button';
import { CrossIcon } from 'lucide-react';
import { Fragment } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ open, onClose, children }: Props) => {
  return (
    <Transition appear as={Fragment} show={open}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl overflow-hidden rounded-lg text-left align-middle">
                <div className="relative flex w-full items-center overflow-hidden bg-white p-3 shadow-2xl">
                  <div className="absolute top-4 right-4">
                    <Button
                      className="transition hover:scale-110"
                      onClick={onClose}
                      size="icon"
                      variant="outline"
                    >
                      <CrossIcon className="size-4" />
                    </Button>
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
