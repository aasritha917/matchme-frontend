import { Avatar } from "../ui/Avatar"

const MessageBubble = ({ message, isOwn, avatar }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? "order-2" : "order-1"}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isOwn ? "bg-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isOwn ? "text-right" : "text-left"}`}>{message.timestamp}</p>
      </div>
      {!isOwn && (
        <Avatar className="h-8 w-8 order-1 mr-2">
          <img src={avatar || "/placeholder.svg"} alt="Avatar" />
        </Avatar>
      )}
    </div>
  )
}

export default MessageBubble
