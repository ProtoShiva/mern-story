import React, { useState } from "react"
import { useNotification } from "../hooks/index.js"
import ModalContainer from "./ModalContainer.jsx"
import StoryForm from "./StoryForm.jsx"
import { updateStory } from "../api/story.js"

export default function UpdateActor({
  visible,
  onClose,
  initialState,
  onSuccess
}) {
  const [busy, setBusy] = useState(false)

  const { updateNotification } = useNotification()

  const handleSubmit = async (data) => {
    setBusy(true)
    const { error, stories } = await updateStory(initialState._id, data)
    setBusy(false)
    if (error) return updateNotification("error", error)
    onSuccess(stories)
    updateNotification("success", "Story updated successfully.")
    onClose()
  }

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <StoryForm
        onSubmit={!busy ? handleSubmit : null}
        btnTitle="Update"
        btnTitle1="Previous"
        btnTitle2="Next"
        busy={busy}
        initialState={initialState}
        onClose={onClose}
      />
    </ModalContainer>
  )
}
