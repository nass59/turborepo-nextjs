'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/design-system/components/ui/button';
import { Form } from '@workspace/design-system/components/ui/form';
import axios from 'axios';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { routes } from '@/constants/routes';
import { apiRoutes } from '@/features/admin/common/constants/routes';
import { InputField } from '@/features/admin/common/ui/form/input-field';
import { toastError } from '@/lib/api-response/api-responses';

import { SPACE_LABELS } from '../constants/space';
import { useSpaceModal } from '../hooks/use-space-modal';
import { type SpaceFormData, spaceSchema } from '../schemas/space';

export const SpaceForm = () => {
  const spaceModal = useSpaceModal();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SpaceFormData>({
    resolver: zodResolver(spaceSchema),
    defaultValues: { name: '' },
  });

  // TODO: Refactor using Server Actions
  const onSubmit = async (values: SpaceFormData) => {
    try {
      setLoading(true);
      const response = await axios.post(apiRoutes.spaces, values);
      window.location.assign(
        `${routes.dashboard}/${String(response.data._id)}`
      );
    } catch (error) {
      toastError(error, SPACE_LABELS.create.error);
    } finally {
      setLoading(false);
    }
  };

  const formLabels = SPACE_LABELS.form;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <InputField
          control={form.control}
          labels={formLabels.name}
          loading={loading}
        />

        <div>
          <Button
            disabled={loading}
            onClick={spaceModal.onClose}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            {loading && <PencilIcon className="mr-2 size-4 animate-spin" />}
            <span>Continue</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
