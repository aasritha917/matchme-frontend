import { Avatar } from "../ui/Avatar"

const TypingIndicator = ({ name, avatar }) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <img src={avatar || "/placeholder.svg"} alt={name} />
        </Avatar>
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
