import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/design-system/components/ui/breadcrumb';
import { Fragment } from 'react';

const MAX_SEGMENTS = 4; // Maximum number of segments to display

type BreadcrumbProps = {
  pathSegments: string[];
};

const LongBreadcrumb = ({ pathSegments }: BreadcrumbProps) => {
  const firstSegment = pathSegments[0];
  const lastSegment = pathSegments.at(-1);

  return (
    <>
      <BreadcrumbItem>
        <span className="text-muted-foreground">{firstSegment}</span>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="font-medium">{lastSegment}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
};

const ShortBreadcrumb = ({ pathSegments }: BreadcrumbProps) => {
  // Show all segments if within limit
  return pathSegments.map((segment, index) => {
    const isLast = index === pathSegments.length - 1;

    return (
      <Fragment key={segment}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage className="font-medium">{segment}</BreadcrumbPage>
          ) : (
            <span className="text-muted-foreground">{segment}</span>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </Fragment>
    );
  });
};

type Props = {
  filePath: string;
};

export const FileBreadcrumb = ({ filePath }: Props) => {
  const pathSegments = filePath.split('/');

  const renderBreadcrumbItems = () => {
    if (pathSegments.length <= MAX_SEGMENTS) {
      return <ShortBreadcrumb pathSegments={pathSegments} />;
    }

    return <LongBreadcrumb pathSegments={pathSegments} />;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};
