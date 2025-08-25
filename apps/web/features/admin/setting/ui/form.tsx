'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { apiRoutes } from '@/features/admin/common/constants/routes';
import { FormContainer } from '@/features/admin/common/ui/form/form-container';
import { InputField } from '@/features/admin/common/ui/form/input-field';
import { SPACE_LABELS } from '@/features/admin/space/constants/space';
import { toastError } from '@/lib/api-response/api-responses';
import type { SpaceModel } from '@/lib/database/models/space';
import { settingSchema } from '@/lib/validation/setting';

import type { SettingsFormData } from '../schemas/setting';

type Props = {
  initialData: SpaceModel;
};

export const SettingsForm = ({ initialData }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingSchema),
    defaultValues: initialData,
  });

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: SettingsFormData) => {
    try {
      setLoading(true);
      await axios.patch(`${apiRoutes.spaces}/${params.spaceId}`, data);
      router.refresh();
      toast(SPACE_LABELS.edit.toastMessage);
    } catch (error) {
      toastError(error, SPACE_LABELS.edit.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer
      form={form}
      initialData={initialData}
      loading={loading}
      onSubmit={onSubmit}
    >
      <InputField
        control={form.control}
        labels={SPACE_LABELS.form.name}
        loading={loading}
      />
    </FormContainer>
  );
};
