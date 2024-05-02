import React, { useState } from "react"
import { createStory } from "../api/story.js"
import { useNotification } from "../hooks/index.js"
import ModalContainer from "./ModalContainer.jsx"
import StoryForm from "./StoryForm.jsx"

export default function StoryUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false)

  const { updateNotification } = useNotification()

  const handleSubmit = async (data) => {
    setBusy(true)
    // console.log(data)
    const { error, story } = await createStory(data)
    setBusy(false)
    if (error) return updateNotification("error", error)

    updateNotification("success", "Story added successfully.")
    onClose()
  }

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <StoryForm
        onSubmit={!busy ? handleSubmit : null}
        btnTitle="Post"
        btnTitle1="Previous"
        btnTitle2="Next"
        busy={busy}
        onClose={onClose}
      />
    </ModalContainer>
  )
}
