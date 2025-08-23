'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { routes } from '@/constants/routes';
import type { BillboardColumn } from '@/features/admin/billboard/ui/columns';
import { apiRoutes } from '@/features/admin/common/constants/routes';
import { FormContainer } from '@/features/admin/common/ui/form/form-container';
import { InputField } from '@/features/admin/common/ui/form/input-field';
import { SelectField } from '@/features/admin/common/ui/form/select-field';
import { toastError } from '@/lib/api-response/api-responses';
import type { CategoryModel } from '@/lib/database/models/Category';

import { CATEGORY_LABELS } from '../constants/category';
import {
  type CategoryFormData,
  categorySchema,
  defaultData,
} from '../schemas/category';

type Props = {
  initialData: CategoryModel | null;
  billboards: BillboardColumn[];
};

export const CategoryForm = ({ initialData, billboards }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || defaultData,
  });

  const { form: formLabels, resource } = CATEGORY_LABELS;
  const { spaceId, categoryId } = params;

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: CategoryFormData) => {
    try {
      setLoading(true);
      const path = `${spaceId}/${resource}`;
      const apiBaseUrl = `${apiRoutes.spaces}/${path}`;
      const resourceUrl = `${routes.dashboard}/${path}`;

      if (initialData) {
        await axios.patch(`${apiBaseUrl}/${categoryId}`, data);
      } else {
        await axios.post(apiBaseUrl, data);
      }

      router.refresh();
      router.push(resourceUrl);
      toast(`Resource ${initialData ? 'updated' : 'created'}.`);
    } catch (error) {
      toastError(error, 'An error occurred while creating the resource.');
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
      {/* Name */}
      <InputField
        control={form.control}
        labels={formLabels.name}
        loading={loading}
      />

      {/* Billboard */}
      <SelectField
        control={form.control}
        labels={formLabels.billboardId}
        loading={loading}
        options={billboards.map((billboard) => ({
          label: billboard.label,
          value: billboard.id,
        }))}
      />
    </FormContainer>
  );
};
