function ProjectCategory({ item }: { item: string }) {
  return (
    <div className="w-max h-min py-1 px-3 border-2 border-gray-500 rounded font-semibold hover:cursor-pointer hover:bg-gray-100">
      <h2 className="text-sm text-gray-700">{item}</h2>
    </div>
  );
}

export default ProjectCategory;
