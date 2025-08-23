'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@workspace/design-system/components/ui/separator';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { routes } from '@/constants/routes';
import { apiRoutes } from '@/features/admin/common/constants/routes';
import { CheckboxField } from '@/features/admin/common/ui/form/checkbox-field';
import { FormContainer } from '@/features/admin/common/ui/form/form-container';
import { InputField } from '@/features/admin/common/ui/form/input-field';
import { MultiImagesField } from '@/features/admin/common/ui/form/multi-images-field';
import { SelectField } from '@/features/admin/common/ui/form/select-field';
import { toastError } from '@/lib/api-response/api-responses';
import type { ItemModel } from '@/lib/database/models/Item';

import type { CategoryColumn } from '../../category/ui/columns';
import { ITEM_LABELS } from '../constants/item';
import { defaultData, type ItemFormData, itemSchema } from '../schemas/item';

type Props = {
  initialData: ItemModel | null;
  categories: CategoryColumn[];
};

export const ItemForm = ({ initialData, categories }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData || defaultData,
  });

  const { form: formLabels, resource } = ITEM_LABELS;
  const { spaceId, itemId } = params;

  // TODO: Refactor using Server Actions
  const onSubmit = async (data: ItemFormData) => {
    try {
      setLoading(true);
      const path = `${spaceId}/${resource}`;
      const apiBaseUrl = `${apiRoutes.spaces}/${path}`;
      const resourceUrl = `${routes.dashboard}/${path}`;

      if (initialData) {
        await axios.patch(`${apiBaseUrl}/${itemId}`, data);
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
      {/* Images */}
      <MultiImagesField
        control={form.control}
        labels={formLabels.images}
        loading={loading}
      />

      {/* Name */}
      <InputField
        control={form.control}
        labels={formLabels.name}
        loading={loading}
      />

      {/* Category */}
      <SelectField
        control={form.control}
        labels={formLabels.categoryId}
        loading={loading}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />

      <Separator className="col-span-3 w-[675px]" />

      <div className="col-span-3 flex gap-5">
        <CheckboxField control={form.control} labels={formLabels.isFeatured} />
        <CheckboxField control={form.control} labels={formLabels.isArchived} />
      </div>
    </FormContainer>
  );
};
