interface FeatureItemProps {
  logo: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureItem = ({ logo, title, description }: FeatureItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
      <div className="bg-slate-900 flex flex-col justify-between h-[180px] p-6 rounded-md text-slate-200">
        {logo}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-100">{title}</h3>
          <p className="text-sm text-slate-100">{description}</p>
        </div>
      </div>
    </div>
  );
};
