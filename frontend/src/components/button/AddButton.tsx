import { Plus } from "lucide-react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function AddButton({ onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition cursor-pointer"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

export default AddButton;