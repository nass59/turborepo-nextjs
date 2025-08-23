import { apiRoutes } from '../constants/routes';
import { Api } from './api';

type Props = {
  resource: string;
  resourceId: string;
  spaceId: string;
};

const METHODS = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
} as const;

const VISIBILITY = {
  public: 'public',
  admin: 'admin',
} as const;

export const ApiList = ({ resource, resourceId, spaceId }: Props) => {
  const baseUrl = `${apiRoutes.spaces}/${spaceId}`;

  return (
    <>
      <Api
        path={`${baseUrl}/${resource}`}
        title={METHODS.get}
        variant={VISIBILITY.public}
      />
      <Api
        path={`${baseUrl}/${resource}/{${resourceId}}`}
        title={METHODS.get}
        variant={VISIBILITY.public}
      />
      <Api
        path={`${baseUrl}/${resource}`}
        title={METHODS.post}
        variant={VISIBILITY.admin}
      />
      <Api
        path={`${baseUrl}/${resource}/{${resourceId}}`}
        title={METHODS.patch}
        variant={VISIBILITY.admin}
      />
      <Api
        path={`${baseUrl}/${resource}/{${resourceId}}`}
        title={METHODS.delete}
        variant={VISIBILITY.admin}
      />
    </>
  );
};
