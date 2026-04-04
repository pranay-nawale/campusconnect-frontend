const ActionButton = ({ text, gradient, onClick }) => {
  return (
    <button
      className="btn text-white px-6 py-3 rounded-xl font-semibold"
      style={{ background: gradient }}
      onClick={onClick}
    >
      {text} →
    </button>
  );
};

export default ActionButton;