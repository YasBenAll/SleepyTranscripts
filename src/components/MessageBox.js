// MessageBox.js

const MessageBox = ({ type, children }) => {
    const getTypeStyles = () => {
      switch (type) {
        case "success":
          return "bg-green-100 text-green-800";
        case "error":
          return "bg-red-100 text-red-800";
        case "info":
          return "bg-violet-400 text-blue-600";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    const containerClasses = `rounded-md p-1 mb-4 text-blue-600}`;
  
    return (
      <div className={containerClasses}>
        <p>{children}</p>
      </div>
    );
  };
  
  export default MessageBox;
  