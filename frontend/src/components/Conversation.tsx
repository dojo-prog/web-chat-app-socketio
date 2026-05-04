import useMessageStore, { type MessagePayload } from "../stores/message.store";
import { ImageIcon, Loader2Icon, SendIcon, XIcon } from "lucide-react";
import CustomInput from "./CustomInput";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../stores/auth.store";
import MessagesLoader from "./loaders/MessagesLoader";
import EmptyMessages from "./empty/EmptyMessages";
import { useForm } from "../hooks/useForm";

const Conversation = () => {
  const {
    selectedUser,
    setSelectedUser,
    fetchingInitialMessages,
    selectedUserMessages,
    sendMessage,
    sendingMessage,
  } = useMessageStore();
  const { user } = useAuthStore();

  const {
    formData: messagePayload,
    setFormData: setMessagePayload,
    handleChange,
    handleFileChange,
    resetForm,
  } = useForm({
    text: "",
    image: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage(messagePayload as MessagePayload);

    resetForm();
    setImagePreview("");
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [selectedUserMessages]);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <div className="h-20 w-full px-6 shadow flex items-center justify-between">
        <div className="flex">
          <div className="w-12 h-12 bg-blue-100 rounded-full mr-2 overflow-hidden flex items-center justify-center">
            {selectedUser?.avatar_url ? (
              <img
                src={selectedUser?.avatar_url}
                alt={selectedUser?.fname}
                className="h-full w-full object-cover"
              />
            ) : (
              <h2 className="font-bold text-blue-700">
                {selectedUser?.fname[0] + selectedUser?.lname[0]!}
              </h2>
            )}
          </div>
          <div>
            <h2 className="text-md font-semibold">
              {selectedUser?.fname + " " + selectedUser?.lname}
            </h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <button
          className="group cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <XIcon size={20} className="text-gray-500 group-hover:text-black" />
        </button>
      </div>

      {/* Messages */}
      {fetchingInitialMessages ? (
        <MessagesLoader />
      ) : selectedUserMessages.length === 0 ? (
        <EmptyMessages />
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {selectedUserMessages.map((msg) => {
            const isSender = msg.sender_id === user?.id;

            return (
              <div
                key={msg.id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                    isSender
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {/* Image (if exists) */}
                  {msg.image_url && (
                    <img
                      src={msg.image_url}
                      alt="message"
                      className="mb-2 rounded-md max-h-60 object-cover"
                    />
                  )}

                  {/* Text */}
                  {msg.content && <p>{msg.content}</p>}

                  {/* Timestamp */}
                  <p
                    className={`text-[10px] mt-1 ${
                      isSender ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={messageEndRef} />
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-6 pb-2">
          <div className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
            <img src={imagePreview} className="w-full h-full object-cover" />

            <button
              className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow cursor-pointer"
              onClick={() => {
                setImagePreview("");
                setMessagePayload((prev) => ({ ...prev, image: undefined }));
              }}
            >
              <XIcon size={14} className="text-gray-500 hover:text-black" />
            </button>
          </div>
        </div>
      )}

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="h-16 border-t px-6 border-gray-200 flex items-center space-x-4"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          name="image"
          onChange={(e) => {
            handleFileChange(e);
            const file = e.target.files?.[0];
            if (!file) return;
            setImagePreview(URL.createObjectURL(file));
          }}
        />

        <label
          htmlFor="image-upload"
          className="h-10 w-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-md cursor-pointer"
        >
          <ImageIcon className="h-full" />
        </label>
        <div className="flex-1">
          <CustomInput
            placeholder="Type message here..."
            id="text"
            value={messagePayload.text}
            onChange={handleChange}
            disabled={sendingMessage}
            required={false}
          />
        </div>
        <button className="h-10 w-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded-md cursor-pointer">
          {!sendingMessage ? (
            <SendIcon className="h-full" />
          ) : (
            <Loader2Icon className="h-full animate-spin" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Conversation;
