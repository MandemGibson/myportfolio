type TitAndSubProps = {
  title: string;
  subtitle: string;
};

function TitAndSub({ title, subtitle }: TitAndSubProps) {
  return (
    <div className="!mt-10 flex flex-col items-center justify-center">
      <h2 className="text-sm text-blue-600 font-semibold">{title}</h2>
      <div className="border-2 border-blue-500 w-9 mt-1 mb-2" />
      <h3 className="text-3xl font-bold text-gray-700 mb-12">{subtitle}</h3>
    </div>
  );
}

export default TitAndSub;
